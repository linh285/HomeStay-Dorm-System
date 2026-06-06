const express = require('express');
const router = express.Router();
const settlementController = require('../controllers/settlementController');
const { authenticate, requireRole } = require('../middleware/auth');

router.use(authenticate);

// ACCOUNTANT, ADMIN: xem dữ liệu quyết toán
router.get('/:maTra', requireRole('ACCOUNTANT', 'ADMIN'), settlementController.getSettlement);

// ACCOUNTANT, ADMIN: tính toán lại (nếu cần) - có thể gọi getSettlement
router.post('/:maTra/calculate', requireRole('ACCOUNTANT', 'ADMIN'), settlementController.calculateSettlement);

// ACCOUNTANT, ADMIN: xác nhận quyết toán
router.put('/:maTra/confirm', requireRole('ACCOUNTANT', 'ADMIN'), settlementController.confirmSettlement);

module.exports = router;