const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.post('/', ctrl.createBooking);
router.get('/mine', auth, ctrl.getMyBookings);
router.get('/', auth, authorize('admin'), ctrl.getBookings);
router.patch('/:id', auth, authorize('admin'), ctrl.updateBooking);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteBooking);

module.exports = router;
