const Service = require('../models/Service');
const { uploadBufferToCloudinary } = require('../middleware/upload');

exports.uploadServiceImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No image file provided.' });
    const result = await uploadBufferToCloudinary(req.file.buffer, 'venthood/services');
    if (!result) {
      return res.status(502).json({ success: false, message: 'Image upload failed. Check Cloudinary configuration.' });
    }
    res.json({ success: true, url: result.url, publicId: result.publicId });
  } catch (err) {
    next(err);
  }
};

exports.getServices = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { active: true };
    const services = await Service.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, services });
  } catch (err) {
    next(err);
  }
};

exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, service });
  } catch (err) {
    next(err);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, service });
  } catch (err) {
    next(err);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, service });
  } catch (err) {
    next(err);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found.' });
    res.json({ success: true, message: 'Service deleted.' });
  } catch (err) {
    next(err);
  }
};
