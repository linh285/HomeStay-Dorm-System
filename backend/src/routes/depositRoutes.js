const express = require('express');
const router = express.Router();
const c = require('../controllers/depositController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', authenticate, c.getAllDeposits);
router.get('/:maCoc', authenticate, c.getDepositById);
router.post('/', authenticate, requireRole('SALE', 'MANAGER', 'ADMIN'), c.createDeposit);
router.put('/:maCoc/confirm', authenticate, requireRole('ACCOUNTANT', 'MANAGER', 'ADMIN'), c.confirmDeposit);

module.exports = router;
