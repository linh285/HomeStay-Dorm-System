const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/rooms', require('./roomRoutes'));
router.use('/deposits', require('./depositRoutes'));
router.use('/contracts', require('./contractRoutes'));
router.use('/handovers', require('./handoverRoutes'));
router.use('/checkout', require('./checkoutRoutes'));
router.use('/settlement', require('./settlementRoutes'));
router.use('/invoices', require('./invoiceRoutes'));
router.use('/policies', require('./policyRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/customers', require('./customerRoutes'));
router.use('/lich-xem', require('./lichXemRoutes'));
router.use('/groups', require('./groupRoutes'));

module.exports = router;
