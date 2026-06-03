const roomService = require('../services/roomService');
const { successResponse, errorResponse } = require('../utils/response');

/**
 * GET /api/rooms
 */
const getAllRooms = async (req, res, next) => {
  try {
    const { TinhTrang, KhuVuc, Tang, MaChiNhanh, search } = req.query;
    const rooms = await roomService.getAllRooms({ TinhTrang, KhuVuc, Tang, MaChiNhanh, search });
    return successResponse(res, rooms, 'Danh sách phòng');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms/available
 */
const getAvailableRooms = async (req, res, next) => {
  try {
    const { SucChua, KhuVuc, MaChiNhanh, GiaThueMax } = req.query;
    const rooms = await roomService.getAvailableRooms({ SucChua, KhuVuc, MaChiNhanh, GiaThueMax });
    return successResponse(res, rooms, 'Danh sách phòng trống');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms/:maPhong
 */
const getRoomById = async (req, res, next) => {
  try {
    const phong = await roomService.getRoomById(req.params.maPhong);
    return successResponse(res, phong, 'Thông tin phòng');
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rooms/:maPhong/beds
 */
const getAllBeds = async (req, res, next) => {
  try {
    const beds = await roomService.getAllBeds(req.params.maPhong);
    return successResponse(res, beds, 'Danh sách giường');
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/rooms
 */
const createRoom = async (req, res, next) => {
  try {
    const { MaPhong, MaChiNhanh, GiaThue, SucChua } = req.body;
    if (!MaPhong || !MaChiNhanh || !GiaThue || !SucChua) {
      return errorResponse(res, 'MaPhong, MaChiNhanh, GiaThue và SucChua là bắt buộc', 400);
    }
    const result = await roomService.createRoom(req.body);
    return successResponse(res, result, 'Tạo phòng thành công', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/rooms/:maPhong
 */
const updateRoom = async (req, res, next) => {
  try {
    const phong = await roomService.updateRoom(req.params.maPhong, req.body);
    return successResponse(res, phong, 'Cập nhật phòng thành công');
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/rooms/:maPhong
 */
const deleteRoom = async (req, res, next) => {
  try {
    const result = await roomService.deleteRoom(req.params.maPhong);
    return successResponse(res, result, 'Xóa phòng thành công');
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/rooms/beds/:maGiuong/status
 */
const updateBedStatus = async (req, res, next) => {
  try {
    const { tinhTrang } = req.body;
    if (!tinhTrang) return errorResponse(res, 'tinhTrang là bắt buộc', 400);
    const giuong = await roomService.updateBedStatus(req.params.maGiuong, tinhTrang);
    return successResponse(res, giuong, 'Cập nhật trạng thái giường thành công');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRooms,
  getAvailableRooms,
  getRoomById,
  getAllBeds,
  createRoom,
  updateRoom,
  deleteRoom,
  updateBedStatus,
};
