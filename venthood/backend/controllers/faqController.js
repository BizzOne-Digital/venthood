const FAQ = require('../models/FAQ');

exports.getFAQs = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { active: true };
    const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, faqs });
  } catch (err) {
    next(err);
  }
};

exports.createFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, faq });
  } catch (err) {
    next(err);
  }
};

exports.updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found.' });
    res.json({ success: true, faq });
  } catch (err) {
    next(err);
  }
};

exports.deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found.' });
    res.json({ success: true, message: 'FAQ deleted.' });
  } catch (err) {
    next(err);
  }
};
