const Gallery = require('../models/Gallery');
const { uploadBufferToCloudinary } = require('../middleware/upload');

exports.getGallery = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { visible: true };
    const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, gallery: items });
  } catch (err) {
    next(err);
  }
};

exports.createGalleryItem = async (req, res, next) => {
  try {
    let imageUrl = req.body.imageUrl || '';

    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, 'venthood/gallery');
      if (result) imageUrl = result.url;
    }

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'An image URL or file is required.' });
    }

    const item = await Gallery.create({ ...req.body, imageUrl });
    res.status(201).json({ success: true, item });
  } catch (err) {
    next(err);
  }
};

exports.updateGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    res.json({ success: true, item });
  } catch (err) {
    next(err);
  }
};

exports.deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    res.json({ success: true, message: 'Gallery item deleted.' });
  } catch (err) {
    next(err);
  }
};
