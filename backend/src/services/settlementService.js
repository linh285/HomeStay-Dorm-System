const { TraPhong, ChiTietKhauTru, HopDongThueNha, DatCoc, Phong, Giuong, ChiTietThue, ThanhToan, sequelize } = require('../models');

const getSettlementData = async (maTra) => {
  const traPhong = await TraPhong.findByPk(maTra, {
    include: [
      {
        model: HopDongThueNha, as: 'hopDong',
        include: [
          { model: Phong, as: 'phong', attributes: ['MaPhong', 'KhuVuc', 'Tang', 'TinhTrang'] },
          { model: DatCoc, as: 'datCoc', attributes: ['MaCoc', 'SoTienCoc', 'TinhTrang'] },
          { model: ChiTietThue, as: 'chiTiets', include: [{ model: Giuong, as: 'giuong' }] },
        ]
      },
      { model: ChiTietKhauTru, as: 'chiTietKhauTrus' },
    ],
  });
  if (!traPhong) throw { statusCode: 404, message: 'Yeu cau tra phong khong ton tai' };
  if (traPhong.TyLeHoanCoc === null || traPhong.TyLeHoanCoc === undefined) {
    throw { statusCode: 400, message: 'Can hoan tat kiem tra tra phong truoc khi doi soat' };
  }

  const soTienCoc = Number(traPhong.hopDong?.datCoc?.SoTienCoc || 0);
  const tyLeHoanCoc = Number(traPhong.TyLeHoanCoc || 0) / 100;
  const soTienHoanCoBan = Math.round(soTienCoc * tyLeHoanCoc);
  const tongKhauTru = traPhong.chiTietKhauTrus.reduce((sum, k) => sum + Number(k.SoTien), 0);
  const netAmount = soTienHoanCoBan - tongKhauTru;
  const ketQua = netAmount >= 0 ? 'HOAN_COC' : 'THU_THEM';

  return {
    traPhong,
    soTienCoc,
    tyLeHoanCoc: traPhong.TyLeHoanCoc,
    soTienHoanCoBan,
    chiTietKhauTru: traPhong.chiTietKhauTrus,
    tongKhauTru,
    soTienHoanCuoi: Math.abs(netAmount),
    soTienRong: netAmount,
    ketQua,
  };
};

const calculateSettlement = async (maTra) => {
  return await getSettlementData(maTra);
};

const refreshRoomStatus = async (maPhong, transaction) => {
  const beds = await Giuong.findAll({ where: { MaPhong: maPhong }, transaction });
  if (beds.length === 0) {
    await Phong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: maPhong }, transaction });
    return;
  }

  const statuses = beds.map((bed) => bed.TinhTrang);
  let roomStatus = 'AVAILABLE';
  if (statuses.every((status) => status === 'OCCUPIED')) roomStatus = 'OCCUPIED';
  else if (statuses.every((status) => ['RESERVED', 'OCCUPIED'].includes(status))) roomStatus = 'RESERVED';
  else if (statuses.some((status) => status === 'PENDING')) roomStatus = 'PENDING';

  await Phong.update({ TinhTrang: roomStatus }, { where: { MaPhong: maPhong }, transaction });
};

const releaseContractSpace = async (hopDong, transaction) => {
  const rentedBedIds = (hopDong?.chiTiets || []).map((ct) => ct.MaGiuong).filter(Boolean);

  if (rentedBedIds.length > 0) {
    await Giuong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaGiuong: rentedBedIds }, transaction });
    if (hopDong.MaPhong) await refreshRoomStatus(hopDong.MaPhong, transaction);
    return;
  }

  if (hopDong?.MaPhong) {
    await Phong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong }, transaction });
    await Giuong.update({ TinhTrang: 'AVAILABLE' }, { where: { MaPhong: hopDong.MaPhong }, transaction });
  }
};

const confirmSettlement = async (maTra, data) => {
  const { phuongThuc, ghiChu } = data;
  const settlement = await getSettlementData(maTra);
  const { traPhong, soTienHoanCuoi, ketQua } = settlement;

  if (traPhong.TrangThai === 'COMPLETED') {
    throw { statusCode: 400, message: 'Yeu cau tra phong da duoc quyet toan' };
  }
  if (traPhong.TrangThai !== 'INSPECTING') {
    throw { statusCode: 400, message: 'Chi duoc quyet toan sau khi da kiem tra tra phong' };
  }

  const t = await sequelize.transaction();
  try {
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
      GhiChu: ghiChu || (ketQua === 'HOAN_COC' ? 'Hoan coc khi tra phong' : 'Thu them chen lech khi tra phong'),
    }, { transaction: t });

    await traPhong.update({ TrangThai: 'COMPLETED', NgayTraThucTe: traPhong.NgayTraThucTe || new Date() }, { transaction: t });
    await HopDongThueNha.update({ TinhTrang: 'TERMINATED' }, { where: { MaHopDong: traPhong.MaHopDong }, transaction: t });
    await releaseContractSpace(traPhong.hopDong, t);

    await t.commit();
    return { maThanhToan, ketQua, soTienHoanCuoi };
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

module.exports = { getSettlementData, calculateSettlement, confirmSettlement };
