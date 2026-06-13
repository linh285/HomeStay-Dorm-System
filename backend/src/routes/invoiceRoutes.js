const express = require('express');
const router = express.Router();
const c = require('../controllers/invoiceController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', authenticate, c.getAllInvoices);
router.get('/contract/:maHopDong', authenticate, c.getByContract);
router.get('/:id', authenticate, c.getInvoiceById);
router.post('/', authenticate, requireRole('ACCOUNTANT', 'ADMIN'), c.createInvoice);

module.exports = router;
