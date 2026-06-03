const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { authenticate, requireRole } = require('../middleware/auth');

router.get('/', authenticate, roomController.getAllRooms);
router.get('/available', authenticate, roomController.getAvailableRooms);
router.get('/:maPhong', authenticate, roomController.getRoomById);
router.get('/:maPhong/beds', authenticate, roomController.getAllBeds);
router.post('/', authenticate, requireRole('MANAGER', 'ADMIN'), roomController.createRoom);
router.put('/:maPhong', authenticate, requireRole('MANAGER', 'ADMIN'), roomController.updateRoom);
router.delete('/:maPhong', authenticate, requireRole('ADMIN'), roomController.deleteRoom);
router.patch('/beds/:maGiuong/status', authenticate, requireRole('MANAGER', 'ADMIN'), roomController.updateBedStatus);

module.exports = router;
