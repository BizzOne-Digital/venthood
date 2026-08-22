const Availability = require('../models/Availability');

exports.getAvailability = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.from || req.query.to) {
      filter.date = {};
      if (req.query.from) filter.date.$gte = req.query.from;
      if (req.query.to) filter.date.$lte = req.query.to;
    }
    const availability = await Availability.find(filter).sort({ date: 1 });
    res.json({ success: true, availability });
  } catch (err) {
    next(err);
  }
};

exports.upsertAvailability = async (req, res, next) => {
  try {
    const { date, slots, blocked } = req.body;
    if (!date) return res.status(400).json({ success: false, message: 'Date is required.' });

    const availability = await Availability.findOneAndUpdate(
      { date },
      { date, slots: slots || [], blocked: !!blocked },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({ success: true, availability });
  } catch (err) {
    next(err);
  }
};

exports.updateAvailability = async (req, res, next) => {
  try {
    const availability = await Availability.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!availability) return res.status(404).json({ success: false, message: 'Availability entry not found.' });
    res.json({ success: true, availability });
  } catch (err) {
    next(err);
  }
};

exports.deleteAvailability = async (req, res, next) => {
  try {
    const availability = await Availability.findByIdAndDelete(req.params.id);
    if (!availability) return res.status(404).json({ success: false, message: 'Availability entry not found.' });
    res.json({ success: true, message: 'Availability entry deleted.' });
  } catch (err) {
    next(err);
  }
};
