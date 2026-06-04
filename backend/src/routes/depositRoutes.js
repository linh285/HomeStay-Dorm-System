const express = require('express');
const router = express.Router();
const c = require('../controllers/depositController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', authenticate, c.getAllDeposits);
router.get('/:maCoc', authenticate, c.getDepositById);
router.post('/', authenticate, requireRole('SALE', 'MANAGER', 'ADMIN', 'ACCOUNTANT'), c.createDeposit);
router.put('/:maCoc/confirm', authenticate, requireRole('ACCOUNTANT', 'MANAGER', 'ADMIN'), c.confirmDeposit);
router.post('/test-expire', authenticate, async (req, res) => {
const count = await require('../services/depositService').expireOverdueDeposits();
  res.json({ message: `Expired ${count} deposits` });
});
module.exports = router;
