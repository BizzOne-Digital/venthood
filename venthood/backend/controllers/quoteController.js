const QuoteRequest = require('../models/QuoteRequest');
const { uploadBufferToCloudinary } = require('../middleware/upload');
const { sendMail } = require('../utils/mailer');
const { sendLeadToCRM } = require('../services/crmService');

exports.createQuote = async (req, res, next) => {
  try {
    const { name, email, phone, service } = req.body;
    if (!name || !email || !phone || !service) {
      return res.status(400).json({ success: false, message: 'Name, email, phone and service are required.' });
    }

    let images = [];
    if (req.files && req.files.length) {
      const uploads = await Promise.all(
        req.files.map((file) => uploadBufferToCloudinary(file.buffer, 'venthood/quotes'))
      );
      images = uploads.filter(Boolean).map((u) => u.url);
    }

    const quoteData = { ...req.body, images };
    if (req.user) quoteData.customer = req.user._id;

    const quote = await QuoteRequest.create(quoteData);

    // Awaited (not fire-and-forget) - on serverless platforms like Vercel the
    // function can be frozen/terminated as soon as the response is sent, so a
    // detached async call here would often never finish sending the email.
    await Promise.allSettled([
      sendMail({
        to: process.env.CONTACT_RECEIVER,
        subject: `New Quote Request - ${quote.name}`,
        html: `<p>New quote request received.</p>
          <p><b>Name:</b> ${quote.name}<br/>
          <b>Email:</b> ${quote.email}<br/>
          <b>Phone:</b> ${quote.phone}<br/>
          <b>Service:</b> ${quote.service}<br/>
          <b>Address:</b> ${quote.address || 'N/A'}, ${quote.city || ''}<br/>
          <b>Details:</b> ${quote.details || 'N/A'}</p>`,
      }),
      sendMail({
        to: quote.email,
        subject: 'We received your quote request - Venthood.ca',
        html: `<p>Hi ${quote.name},</p>
          <p>Thanks for requesting a quote from Venthood.ca. We've received your request for <b>${quote.service}</b> and will be in touch shortly with pricing and next steps.</p>
          <p><b>Details you provided:</b><br/>${quote.details || 'N/A'}</p>
          <p>Venthood.ca</p>`,
      }),
      sendLeadToCRM({ type: 'quote', ...quote.toObject() }),
    ]);

    res.status(201).json({ success: true, quote });
  } catch (err) {
    next(err);
  }
};

exports.getQuotes = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const quotes = await QuoteRequest.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, quotes });
  } catch (err) {
    next(err);
  }
};

exports.getMyQuotes = async (req, res, next) => {
  try {
    const quotes = await QuoteRequest.find({ customer: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, quotes });
  } catch (err) {
    next(err);
  }
};

exports.updateQuote = async (req, res, next) => {
  try {
    const quote = await QuoteRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quote) return res.status(404).json({ success: false, message: 'Quote request not found.' });
    res.json({ success: true, quote });
  } catch (err) {
    next(err);
  }
};

exports.deleteQuote = async (req, res, next) => {
  try {
    const quote = await QuoteRequest.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ success: false, message: 'Quote request not found.' });
    res.json({ success: true, message: 'Quote request deleted.' });
  } catch (err) {
    next(err);
  }
};
