const express = require('express');
const router = express.Router();
const c = require('../controllers/contractController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/search', authenticate, c.findContractBySearch);
router.get('/', authenticate, c.getAllContracts);
router.get('/:maHopDong', authenticate, c.getContractById);
router.post('/', authenticate, requireRole('SALE', 'ADMIN'), c.createContract);
router.put('/:maHopDong/activate', authenticate, requireRole('ACCOUNTANT', 'ADMIN'), c.activateContract);
router.put('/:maHopDong/terminate', authenticate, requireRole('MANAGER', 'ADMIN'), c.terminateContract);
router.put('/nhom/:maNhom/screen', authenticate, requireRole('SALE', 'MANAGER', 'ADMIN'), c.screenMembers);

module.exports = router;
