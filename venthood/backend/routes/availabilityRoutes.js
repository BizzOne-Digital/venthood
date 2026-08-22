const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/availabilityController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', ctrl.getAvailability);
router.post('/', auth, authorize('admin'), ctrl.upsertAvailability);
router.put('/:id', auth, authorize('admin'), ctrl.updateAvailability);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteAvailability);

module.exports = router;
