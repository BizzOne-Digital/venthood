const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/testimonialController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', ctrl.getTestimonials);
router.post('/', auth, authorize('admin'), ctrl.createTestimonial);
router.put('/:id', auth, authorize('admin'), ctrl.updateTestimonial);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteTestimonial);

module.exports = router;
