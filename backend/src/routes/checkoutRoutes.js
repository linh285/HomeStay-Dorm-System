const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const { authenticate, requireRole } = require('../middleware/auth');

// Tất cả các route dưới đây đều yêu cầu xác thực
router.use(authenticate);

// SALE, ADMIN: tạo yêu cầu trả phòng
router.post('/', requireRole('SALE', 'ADMIN'), checkoutController.createCheckout);

// SALE, MANAGER, ADMIN, ACCOUNTANT: lấy danh sách (SALE cần xem yêu cầu của mình)
router.get('/', requireRole('SALE', 'MANAGER', 'ADMIN', 'ACCOUNTANT'), checkoutController.getAllCheckouts);

// SALE, MANAGER, ADMIN, ACCOUNTANT: xem chi tiết yêu cầu
router.get('/:maTra', requireRole('SALE', 'MANAGER', 'ADMIN', 'ACCOUNTANT'), checkoutController.getCheckoutById);

// MANAGER, ADMIN: bắt đầu kiểm tra
router.put('/:maTra/inspect', requireRole('MANAGER', 'ADMIN'), checkoutController.startInspection);

// MANAGER, ADMIN: hoàn tất kiểm tra (chuyển thành INSPECTED)
router.put('/:maTra/complete', requireRole('MANAGER', 'ADMIN'), checkoutController.completeInspection);

// MANAGER, ADMIN: thêm khoản khấu trừ
router.post('/:maTra/damages', requireRole('MANAGER', 'ADMIN'), checkoutController.addDamage);

module.exports = router;