const express = require('express');
const router = express.Router();
const c = require('../controllers/handoverController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/assets/default', authenticate, c.getDefaultAssets);
router.get('/contract/:maHopDong', authenticate, c.getHandoverByContract);
router.post('/contract/:maHopDong', authenticate, requireRole('MANAGER', 'SALE', 'ADMIN'), c.createHandover);
router.put('/:maBanGiao/confirm', authenticate, requireRole('MANAGER', 'ADMIN'), c.confirmHandover);
router.put('/:maBanGiao/assets/:maTaiSan', authenticate, c.updateAssetCheck);
router.post('/:maBanGiao/assets', authenticate, c.addAsset);

module.exports = router;
