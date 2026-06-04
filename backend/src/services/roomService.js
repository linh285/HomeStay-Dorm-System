const { Op } = require('sequelize');
const { Phong, Giuong, ChiNhanh } = require('../models');

/**
 * Generate a unique bed code based on room and index
 * e.g. room P101, bed index 1 => G101A
 */
const generateBedCode = (maPhong, index) => {
  const suffix = String.fromCharCode(64 + index); // 1→A, 2→B ...
  const roomPart = maPhong.replace(/[^0-9]/g, ''); // extract digits
  return `G${roomPart}${suffix}`;
};
const getLoaiPhong = (sucChua) => {
  if (sucChua === 1) return 'Phòng đơn';
  if (sucChua === 2) return 'Phòng đôi';
  if (sucChua <= 4) return 'Phòng tập thể nhỏ';
  return 'Phòng tập thể lớn';
};
/**
 * Get all rooms with optional filters
 * Filters: TinhTrang, KhuVuc, Tang, MaChiNhanh, search by MaPhong
 */
const getAllRooms = async (filters = {}) => {
  const where = {};

  if (filters.TinhTrang) where.TinhTrang = filters.TinhTrang;
  if (filters.KhuVuc) where.KhuVuc = filters.KhuVuc;
  if (filters.Tang) where.Tang = parseInt(filters.Tang);
  if (filters.MaChiNhanh) where.MaChiNhanh = filters.MaChiNhanh;
  if (filters.search) {
    where.MaPhong = { [Op.iLike]: `%${filters.search}%` };
  }

  const rooms = await Phong.findAll({
    where,
    include: [
      { model: ChiNhanh, as: 'chiNhanh', attributes: ['TenChiNhanh', 'DiaChi'] },
      { model: Giuong, as: 'giuongs', attributes: ['MaGiuong', 'GiaGiuong', 'TinhTrang'] },
    ],
    order: [['MaPhong', 'ASC']],
  });

  // Thêm trường LoaiPhong dựa trên SucChua
  const roomsWithType = rooms.map(room => {
    const plain = room.toJSON();
    plain.LoaiPhong = getLoaiPhong(plain.SucChua);
    return plain;
  });

  return roomsWithType;
};

/**
 * Get a single room by ID with full bed details
 */
const getRoomById = async (maPhong) => {
  const phong = await Phong.findByPk(maPhong, {
    include: [
      { model: ChiNhanh, as: 'chiNhanh' },
      { model: Giuong, as: 'giuongs' },
    ],
  });
  if (!phong) throw { statusCode: 404, message: `Phòng ${maPhong} không tồn tại` };
  const plain = phong.toJSON();
  plain.LoaiPhong = getLoaiPhong(plain.SucChua);
  return plain;
  };

/**
 * Create a new room and auto-generate beds based on SucChua
 */
const createRoom = async (data) => {
  const { MaPhong, MaChiNhanh, GiaThue, KhuVuc, Tang, SucChua, TinhTrang, GhiChu } = data;

  // Check for duplicate
  const existing = await Phong.findByPk(MaPhong);
  if (existing) throw { statusCode: 409, message: `Mã phòng ${MaPhong} đã tồn tại` };

  // Create room
  const phong = await Phong.create({
    MaPhong,
    MaChiNhanh,
    GiaThue,
    KhuVuc,
    Tang,
    SucChua,
    TinhTrang: TinhTrang || 'AVAILABLE',
    GhiChu,
  });

  // Auto-create beds based on SucChua
  const giaGiuong = Math.round(GiaThue / SucChua);
  const beds = [];
  for (let i = 1; i <= SucChua; i++) {
    const maGiuong = data.bedCodes
      ? data.bedCodes[i - 1]
      : generateBedCode(MaPhong, i);
    beds.push({
      MaGiuong: maGiuong,
      MaPhong,
      GiaGiuong: giaGiuong,
      TinhTrang: 'AVAILABLE',
    });
  }
  const createdBeds = await Giuong.bulkCreate(beds);

  return { phong, giuongs: createdBeds };
};

/**
 * Update room details
 */
const updateRoom = async (maPhong, data) => {
  const phong = await Phong.findByPk(maPhong);
  if (!phong) throw { statusCode: 404, message: `Phòng ${maPhong} không tồn tại` };

  // Prevent update of MaPhong
  delete data.MaPhong;

  await phong.update(data);
  return phong.reload({
    include: [
      { model: ChiNhanh, as: 'chiNhanh' },
      { model: Giuong, as: 'giuongs' },
    ],
  });
};

/**
 * Delete a room (only if AVAILABLE or INACTIVE and no active beds)
 */
const deleteRoom = async (maPhong) => {
  const phong = await Phong.findByPk(maPhong, {
    include: [{ model: Giuong, as: 'giuongs' }],
  });
  if (!phong) throw { statusCode: 404, message: `Phòng ${maPhong} không tồn tại` };

  const occupiedBeds = phong.giuongs.filter(
    (g) => !['AVAILABLE', 'BROKEN'].includes(g.TinhTrang)
  );
  if (occupiedBeds.length > 0) {
    throw {
      statusCode: 400,
      message: 'Không thể xóa phòng đang có giường được sử dụng hoặc đặt trước',
    };
  }

  await phong.destroy();
  return { message: `Đã xóa phòng ${maPhong}` };
};

/**
 * Get all beds for a specific room
 */
const getAllBeds = async (maPhong) => {
  const phong = await Phong.findByPk(maPhong);
  if (!phong) throw { statusCode: 404, message: `Phòng ${maPhong} không tồn tại` };

  const beds = await Giuong.findAll({
    where: { MaPhong: maPhong },
    order: [['MaGiuong', 'ASC']],
  });
  return beds;
};

/**
 * Update a bed's status
 */
const updateBedStatus = async (maGiuong, tinhTrang) => {
  const validStatuses = ['AVAILABLE', 'PENDING', 'RESERVED', 'OCCUPIED', 'BROKEN'];
  if (!validStatuses.includes(tinhTrang)) {
    throw { statusCode: 400, message: `Trạng thái không hợp lệ: ${tinhTrang}` };
  }

  const giuong = await Giuong.findByPk(maGiuong);
  if (!giuong) throw { statusCode: 404, message: `Giường ${maGiuong} không tồn tại` };

  await giuong.update({ TinhTrang: tinhTrang });
  return giuong;
};

/**
 * Get available rooms for booking
 * Filters: SucChua, KhuVuc, MaChiNhanh
 */
const getAvailableRooms = async (criteria = {}) => {
  const where = { TinhTrang: 'AVAILABLE' };

  if (criteria.KhuVuc) where.KhuVuc = criteria.KhuVuc;
  if (criteria.MaChiNhanh) where.MaChiNhanh = criteria.MaChiNhanh;
  if (criteria.SucChua) where.SucChua = { [Op.gte]: parseInt(criteria.SucChua) };
  if (criteria.GiaThueMax) where.GiaThue = { [Op.lte]: parseFloat(criteria.GiaThueMax) };

  const rooms = await Phong.findAll({
    where,
    include: [
      { model: ChiNhanh, as: 'chiNhanh', attributes: ['TenChiNhanh'] },
      {
        model: Giuong,
        as: 'giuongs',
        where: { TinhTrang: 'AVAILABLE' },
        required: true,
      },
    ],
    order: [['GiaThue', 'ASC']],
  });
  const roomsWithType = rooms.map(room => {
  const plain = room.toJSON();
  plain.LoaiPhong = getLoaiPhong(plain.SucChua);
    return plain;
  });
  return roomsWithType;

};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getAllBeds,
  updateBedStatus,
  getAvailableRooms,
};
