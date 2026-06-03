const express = require('express');
const router = express.Router();
const c = require('../controllers/policyController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', authenticate, c.getAllPolicies);
router.get('/:id', authenticate, c.getPolicyById);
router.post('/', authenticate, requireRole('MANAGER', 'ADMIN'), c.createPolicy);
router.put('/:id', authenticate, requireRole('MANAGER', 'ADMIN'), c.updatePolicy);
router.delete('/:id', authenticate, requireRole('ADMIN'), c.deletePolicy);

module.exports = router;
