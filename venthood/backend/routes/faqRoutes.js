const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/faqController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', ctrl.getFAQs);
router.post('/', auth, authorize('admin'), ctrl.createFAQ);
router.put('/:id', auth, authorize('admin'), ctrl.updateFAQ);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteFAQ);

module.exports = router;
