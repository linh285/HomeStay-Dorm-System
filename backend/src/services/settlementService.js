const { TraPhong, ChiTietKhauTru, HopDongThueNha, DatCoc, Phong, Giuong, ThanhToan, sequelize } = require('../models');
const { diffInMonths } = require('../utils/dateHelpers');

/**
 * Tính tỷ lệ hoàn cọc theo quy định nghiệp vụ
 * @param {Object} hopDong - Hợp đồng (có thể null)
 * @param {Date} ngayTra - Ngày trả thực tế
 * @returns {number} tỷ lệ (0.8, 0.5, 0.7, 1.0)
 */
const calculateRefundRate = (hopDong, ngayTra) => {
  if (!hopDong) return 0.8; // Chưa ký hợp đồng → 80%

  const ngayBatDau = new Date(hopDong.NgayBatDau);
  const ngayKetThuc = new Date(hopDong.NgayKetThuc);
  const ngayTraDate = new Date(ngayTra);

  // Hợp đồng đã hết hạn tự nhiên
  if (ngayTraDate >= ngayKetThuc) return 1.0;

  // Chưa hết hạn, tính số tháng đã ở
  const monthsStayed = diffInMonths(ngayBatDau, ngayTraDate);
  if (monthsStayed < 6) return 0.5;
  return 0.7;
};

/**
 * Lấy dữ liệu đối soát quyết toán (dành cho ACCOUNTANT)
 */
const getSettlementData = async (maTra) => {
  const traPhong = await TraPhong.findByPk(maTra, {
    include: [
      {
        model: HopDongThueNha, as: 'hopDong',
        include: [
          { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc', 'Tang', 'TinhTrang'] },
          { model: DatCoc, as: 'datCoc', attributes: ['MaCoc', 'SoTienCoc', 'TinhTrang'] },
        ]
      },
      { model: ChiTietKhauTru, as: 'chiTietKhauTrus' },
    ],
  });
  if (!traPhong) throw { statusCode: 404, message: 'Yêu cầu trả phòng không tồn tại' };
  if (traPhong.TrangThai !== 'INSPECTED') {
    throw { statusCode: 400, message: 'Yêu cầu chưa được kiểm tra xong' };
  }

  const hopDong = traPhong.hopDong;
  const soTienCoc = Number(hopDong?.datCoc?.SoTienCoc || 0);
  const ngayTra = traPhong.NgayTraThucTe || new Date();
  const tyLe = calculateRefundRate(hopDong, ngayTra);
  const tyLePercent = tyLe * 100;

  const soTienHoanCoBan = Math.round(soTienCoc * tyLe);
  const tongKhauTru = traPhong.chiTietKhauTrus.reduce((sum, k) => sum + Number(k.SoTien), 0);
  const soTienHoanCuoi = soTienHoanCoBan - tongKhauTru;
  const ketQua = soTienHoanCuoi >= 0 ? 'HOAN_COC' : 'THU_THEM';

  return {
    traPhong,
    soTienCoc,
    tyLeHoanCoc: tyLePercent,
    soTienHoanCoBan,
    chiTietKhauTru: traPhong.chiTietKhauTrus,
    tongKhauTru,
    soTienHoanCuoi: Math.abs(soTienHoanCuoi),
    ketQua,
  };
};

/**
 * Xác nhận quyết toán (ACCOUNTANT)
 */
const confirmSettlement = async (maTra, data) => {
  const { phuongThuc, ghiChu } = data;
  const settlement = await getSettlementData(maTra);
  const { traPhong, soTienHoanCuoi, ketQua } = settlement;

  const t = await sequelize.transaction();
  try {
    // Tạo thanh toán
    const countTT = await ThanhToan.count({ transaction: t });
    const maThanhToan = `TT-${String(countTT + 1).padStart(5, '0')}`;
    await ThanhToan.create({
      MaThanhToan: maThanhToan,
      MaHopDong: traPhong.MaHopDong,
      MaCoc: traPhong.hopDong?.datCoc?.MaCoc || null,
      SoTien: soTienHoanCuoi,
      PhuongThuc: phuongThuc || 'TIEN_MAT',
      NgayThanhToan: new Date(),
      LoaiThanhToan: ketQua === 'HOAN_COC' ? 'REFUND' : 'PENALTY',
      TinhTrang: 'SUCCESS',
      GhiChu: ghiChu || '',
    }, { transaction: t });

    // Cập nhật trạng thái yêu cầu trả phòng
    await traPhong.update({ TrangThai: 'COMPLETED' }, { transaction: t });

    // Thanh lý hợp đồng và giải phóng phòng
    const hopDong = traPhong.hopDong;
    if (hopDong) {
      await HopDongThueNha.update({ TinhTrang: 'TERMINATED' }, { where: { MaHopDong: traPhong.MaHopDong }, transaction: t });
      if (hopDong.MaPhong) {
        await Phong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong }, transaction: t });
        await Giuong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong }, transaction: t });
      }
    }

    await t.commit();
    return { maThanhToan, ketQua, soTienHoanCuoi };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = { getSettlementData, confirmSettlement };