const { TraPhong, ChiTietKhauTru, HopDongThueNha, DatCoc, Phong, Giuong, ThanhToan, sequelize } = require('../models');

/**
 * Lấy dữ liệu đối soát quyết toán
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

  const soTienCoc = Number(traPhong.hopDong?.datCoc?.SoTienCoc || 0);
  const tyLeHoanCoc = Number(traPhong.TyLeHoanCoc || 0) / 100;
  const soTienHoanCoBan = Math.round(soTienCoc * tyLeHoanCoc);
  const tongKhauTru = traPhong.chiTietKhauTrus.reduce((sum, k) => sum + Number(k.SoTien), 0);
  const soTienHoanCuoi = soTienHoanCoBan - tongKhauTru;
  const ketQua = soTienHoanCuoi >= 0 ? 'HOAN_COC' : 'THU_THEM';

  return {
    traPhong,
    soTienCoc,
    tyLeHoanCoc: traPhong.TyLeHoanCoc,
    soTienHoanCoBan,
    chiTietKhauTru: traPhong.chiTietKhauTrus,
    tongKhauTru,
    soTienHoanCuoi: Math.abs(soTienHoanCuoi),
    ketQua,
  };
};

/**
 * Tính toán lại quyết toán (sau khi thêm khấu trừ)
 */
const calculateSettlement = async (maTra) => {
  return await getSettlementData(maTra);
};

/**
 * Xác nhận quyết toán - hoàn cọc hoặc thu thêm
 */
const confirmSettlement = async (maTra, data) => {
  const { phuongThuc, ghiChu } = data;
  const settlement = await getSettlementData(maTra);
  const { traPhong, soTienHoanCuoi, ketQua } = settlement;

  const t = await sequelize.transaction();
  try {
    // Create payment record
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

    // Update TraPhong to COMPLETED
    await traPhong.update({ TrangThai: 'COMPLETED', NgayTraThucTe: new Date() }, { transaction: t });

    // Terminate contract and free room
    const hopDong = traPhong.hopDong;
    await HopDongThueNha.update({ TinhTrang: 'TERMINATED' }, { where: { MaHopDong: traPhong.MaHopDong }, transaction: t });
    if (hopDong?.MaPhong) {
      await Phong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong }, transaction: t });
      await Giuong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong }, transaction: t });
    }

    await t.commit();
    return { maThanhToan, ketQua, soTienHoanCuoi };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = { getSettlementData, calculateSettlement, confirmSettlement };
