const express = require('express');
const router = express.Router();
const c = require('../controllers/customerController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, c.getAllCustomers);
router.get('/:id', authenticate, c.getCustomerById);
router.post('/', authenticate, c.createCustomer);
router.put('/:id', authenticate, c.updateCustomer);

module.exports = router;
