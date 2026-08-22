const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { upload } = require('../middleware/upload');

router.get('/', ctrl.getServices);
router.post('/upload-image', auth, authorize('admin'), upload.single('image'), ctrl.uploadServiceImage);
router.get('/:slug', ctrl.getServiceBySlug);
router.post('/', auth, authorize('admin'), ctrl.createService);
router.put('/:id', auth, authorize('admin'), ctrl.updateService);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteService);

module.exports = router;
