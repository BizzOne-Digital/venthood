const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/galleryController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { upload } = require('../middleware/upload');

router.get('/', ctrl.getGallery);
router.post('/', auth, authorize('admin'), upload.single('image'), ctrl.createGalleryItem);
router.put('/:id', auth, authorize('admin'), ctrl.updateGalleryItem);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteGalleryItem);

module.exports = router;
