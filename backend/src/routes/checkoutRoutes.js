const express = require('express');
const router = express.Router();
const c = require('../controllers/checkoutController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', authenticate, c.getAllCheckouts);
router.get('/:maTra', authenticate, c.getCheckoutById);
router.post('/', authenticate, requireRole('SALE', 'MANAGER', 'ADMIN'), c.createCheckout);
router.put('/:maTra/inspect', authenticate, requireRole('MANAGER', 'ADMIN'), c.startInspection);
router.put('/:maTra/complete', authenticate, requireRole('MANAGER', 'ADMIN'), c.completeInspection);
router.post('/:maTra/damages', authenticate, requireRole('MANAGER', 'ADMIN'), c.addDamage);

module.exports = router;
