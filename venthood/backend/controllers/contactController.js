const ContactMessage = require('../models/ContactMessage');
const { sendMail } = require('../utils/mailer');

exports.createContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
    }

    const contactMessage = await ContactMessage.create(req.body);

    // Awaited (not fire-and-forget) - on serverless platforms like Vercel the
    // function can be frozen/terminated as soon as the response is sent, so a
    // detached async call here would often never finish sending the email.
    await Promise.allSettled([
      sendMail({
        to: process.env.CONTACT_RECEIVER,
        subject: `New Contact Message - ${contactMessage.subject || 'General Inquiry'}`,
        html: `<p><b>Name:</b> ${contactMessage.name}<br/>
          <b>Email:</b> ${contactMessage.email}<br/>
          <b>Phone:</b> ${contactMessage.phone || 'N/A'}</p>
          <p><b>Message:</b><br/>${contactMessage.message}</p>`,
      }),
      sendMail({
        to: contactMessage.email,
        subject: 'We received your message - Venthood.ca',
        html: `<p>Hi ${contactMessage.name},</p>
          <p>Thanks for reaching out to Venthood.ca. We've received your message and will get back to you shortly.</p>
          <p><b>Your message:</b><br/>${contactMessage.message}</p>
          <p>If this is urgent, feel free to call us directly.</p>
          <p>Venthood.ca</p>`,
      }),
    ]);

    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    next(err);
  }
};

exports.getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, messages });
  } catch (err) {
    next(err);
  }
};

exports.updateContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.json({ success: true, message });
  } catch (err) {
    next(err);
  }
};

exports.deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    next(err);
  }
};
