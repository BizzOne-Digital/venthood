const SiteSettings = require('../models/SiteSettings');

exports.getSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.getSingleton();
    res.json({ success: true, settings });
  } catch (err) {
    next(err);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const settings = await SiteSettings.getSingleton();
    Object.assign(settings, req.body);
    await settings.save();
    res.json({ success: true, settings });
  } catch (err) {
    next(err);
  }
};
