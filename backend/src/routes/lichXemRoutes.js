const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const lichXemController = require('../controllers/lichXemController');

router.post('/', authenticate, requireRole('SALE', 'MANAGER'), lichXemController.create);
router.get('/', authenticate, lichXemController.getAll);
router.get('/:maLich', authenticate, lichXemController.getById);
router.put('/:maLich', authenticate, requireRole('SALE', 'MANAGER'), lichXemController.update);
router.delete('/:maLich', authenticate, requireRole('MANAGER'), lichXemController.deleteLich);

module.exports = router;