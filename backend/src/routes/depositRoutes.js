const express = require('express');
const router = express.Router();
const c = require('../controllers/depositController');
const { authenticate, requireRole } = require('../middleware/auth');

// Static routes before dynamic /:maCoc
router.post('/test-expire', authenticate, requireRole('ADMIN'), async (req, res) => {
  const count = await require('../services/depositService').expireOverdueDeposits();
  res.json({ message: `Expired ${count} deposits` });
});

router.get('/', authenticate, c.getAllDeposits);
router.get('/:maCoc', authenticate, c.getDepositById);
router.post('/', authenticate, requireRole('SALE', 'ADMIN'), c.createDeposit);
// Kế toán tính tiền cọc & gửi yêu cầu thanh toán (spec 3.1.2)
router.put('/:maCoc/send-payment', authenticate, requireRole('ACCOUNTANT', 'ADMIN'), c.sendPaymentRequest);
// Quản lý đối chiếu chứng từ & xác nhận đã nhận cọc hợp lệ (spec 3.1.2)
router.put('/:maCoc/confirm', authenticate, requireRole('MANAGER', 'ADMIN'), c.confirmDeposit);
router.put('/:maCoc/cancel', authenticate, requireRole('SALE', 'MANAGER', 'ADMIN'), c.cancelDeposit);
router.put('/:maCoc/reject', authenticate, requireRole('MANAGER', 'ADMIN'), c.rejectDeposit);
module.exports = router;
