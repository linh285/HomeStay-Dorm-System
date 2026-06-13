const express = require('express');
const router = express.Router();
const c = require('../controllers/settlementController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/:maTra', authenticate, requireRole('ACCOUNTANT', 'MANAGER', 'ADMIN'), c.getSettlement);
router.post('/:maTra/calculate', authenticate, requireRole('ACCOUNTANT', 'MANAGER', 'ADMIN'), c.calculateSettlement);
router.put('/:maTra/confirm', authenticate, requireRole('ACCOUNTANT', 'ADMIN'), c.confirmSettlement);

module.exports = router;
