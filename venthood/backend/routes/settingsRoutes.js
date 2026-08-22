const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/settingsController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', ctrl.getSettings);
router.put('/', auth, authorize('admin'), ctrl.updateSettings);

module.exports = router;
