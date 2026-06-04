const depositService = require('../services/depositService');
const { successResponse, errorResponse } = require('../utils/response');

const getAllDeposits = async (req, res, next) => {
  try {
    const filters = {
      TinhTrang: req.query.tinhTrang && req.query.tinhTrang !== 'ALL' ? req.query.tinhTrang : undefined,
      MaKH: req.query.maKH || undefined,
      MaPhong: req.query.maPhong || undefined,
    };
    const deposits = await depositService.getAllDeposits(filters);
    return successResponse(res, deposits);
  } catch (e) { next(e); }
};

const getDepositById = async (req, res, next) => {
  try {
    const result = await depositService.getDepositById(req.params.maCoc);
    return successResponse(res, result);
  } catch (e) { next(e); }
};

const createDeposit = async (req, res, next) => {
  try {
    const {
      maPhong, maGiuong,
      // Fields from BookingWorkspace (new customer info)
      hoTenKhach, sdt, email,
      // If MaKH already known (direct API call)
      MaKH,
      soTienCoc, tienCoc, phuongThucThanhToan, ghiChu,
    } = req.body;

    const { KhachHang } = require('../models');

    let maKH = MaKH;

    // If no MaKH provided, find-or-create customer by SDT
    if (!maKH && sdt) {
      let khach = await KhachHang.findOne({ where: { SDT: sdt } });
      if (!khach) {
        const countKH = await KhachHang.count();
        khach = await KhachHang.create({
          MaKH: `KH-${String(countKH + 1).padStart(4, '0')}`,
          HoTen: hoTenKhach || 'Khách vãng lai',
          SDT: sdt,
          Email: email || null,
        });
      }
      maKH = khach.MaKH;
    }

    if (!maKH) {
      return errorResponse(res, 'Thiếu thông tin khách hàng (MaKH hoặc SDT)', 400);
    }
    const { v4: uuidv4 } = require('uuid');
    const maCoc = `COC-${uuidv4().slice(0, 8).toUpperCase()}`;
    const result = await depositService.createDepositRequest({
      MaCoc: maCoc,
      MaKH: maKH,
      MaPhong: maPhong || null,
      MaGiuong: maGiuong || null,
      SoTienCoc: soTienCoc || tienCoc || null,
      PhuongThucThanhToan: phuongThucThanhToan || 'TIEN_MAT',
      GhiChu: ghiChu || null,
    });
    return successResponse(res, result, 'Tạo đặt cọc thành công', 201);
  } catch (e) { next(e); }
};

const confirmDeposit = async (req, res, next) => {
  try {
    const maNVPheDuyet = req.user.maNV;
    const countTT = await require('../models').ThanhToan.count();
    const maThanhToan = `TT-${String(countTT + 1).padStart(5, '0')}`;
    const result = await depositService.confirmDeposit(req.params.maCoc, {
      ...req.body, maNVPheDuyet, maThanhToan,
    });
    return successResponse(res, result, 'Xác nhận thanh toán cọc thành công');
  } catch (e) { next(e); }
};

module.exports = { getAllDeposits, getDepositById, createDeposit, confirmDeposit };
