const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Store files in memory, then upload buffer to Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed.'));
    }
  },
});

// Uploads a single buffer to Cloudinary, returns { url, publicId } or null on failure
const uploadBufferToCloudinary = (buffer, folder = 'venthood') => {
  return new Promise((resolve) => {
    try {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error.message);
            return resolve(null);
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      stream.end(buffer);
    } catch (err) {
      console.error('Cloudinary upload exception:', err.message);
      resolve(null);
    }
  });
};

module.exports = { upload, uploadBufferToCloudinary };
