const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { authenticate, requireRole } = require('../middleware/auth');

router.post('/', authenticate, requireRole('SALE', 'MANAGER', 'ADMIN'), groupController.createGroup);
router.get('/:maNhom', authenticate, groupController.getGroupById);

module.exports = router;