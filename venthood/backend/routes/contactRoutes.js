const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.post('/', ctrl.createContactMessage);
router.get('/', auth, authorize('admin'), ctrl.getContactMessages);
router.patch('/:id', auth, authorize('admin'), ctrl.updateContactMessage);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteContactMessage);

module.exports = router;
