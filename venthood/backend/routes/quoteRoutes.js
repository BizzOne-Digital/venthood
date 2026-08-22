const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/quoteController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const { upload } = require('../middleware/upload');

router.post('/', upload.array('images', 6), ctrl.createQuote);
router.get('/mine', auth, ctrl.getMyQuotes);
router.get('/', auth, authorize('admin'), ctrl.getQuotes);
router.patch('/:id', auth, authorize('admin'), ctrl.updateQuote);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteQuote);

module.exports = router;
