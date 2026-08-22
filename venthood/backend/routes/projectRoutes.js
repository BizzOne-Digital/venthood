const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/projectController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', ctrl.getProjects);
router.get('/:id', ctrl.getProject);
router.post('/', auth, authorize('admin'), ctrl.createProject);
router.put('/:id', auth, authorize('admin'), ctrl.updateProject);
router.delete('/:id', auth, authorize('admin'), ctrl.deleteProject);

module.exports = router;
