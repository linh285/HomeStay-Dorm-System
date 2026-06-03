const {
  BangGiao, BangGiaoTaiSan, TaiSan, HopDongThueNha, Phong, Giuong, NhanVien, sequelize
} = require('../models');

// Default assets for a room handover
const DEFAULT_ASSETS = [
  { tenTaiSan: 'Giường tầng', soLuong: 2, loaiTaiSan: 'Nội thất' },
  { tenTaiSan: 'Nệm', soLuong: 2, loaiTaiSan: 'Nội thất' },
  { tenTaiSan: 'Tủ quần áo', soLuong: 1, loaiTaiSan: 'Nội thất' },
  { tenTaiSan: 'Chìa khóa / thẻ từ', soLuong: 2, loaiTaiSan: 'Khóa' },
  { tenTaiSan: 'Điều hòa nhiệt độ', soLuong: 1, loaiTaiSan: 'Điện lạnh' },
  { tenTaiSan: 'Quạt treo tường', soLuong: 1, loaiTaiSan: 'Điện' },
];

const getDefaultAssets = () => DEFAULT_ASSETS;

/**
 * Tạo biên bản bàn giao cho hợp đồng
 */
const createHandover = async (maHopDong, maNV) => {
  const hopDong = await HopDongThueNha.findByPk(maHopDong);
  if (!hopDong) throw { statusCode: 404, message: 'Hợp đồng không tồn tại' };
  if (hopDong.TinhTrang !== 'ACTIVE') {
    throw { statusCode: 400, message: 'Hợp đồng chưa được kích hoạt (cần thanh toán kỳ đầu trước)' };
  }

  // Check if handover already exists
  const existing = await BangGiao.findOne({ where: { MaHopDong: maHopDong } });
  if (existing) return existing;

  const count = await BangGiao.count();
  const maBanGiao = `BG-${String(count + 1).padStart(4, '0')}`;

  const t = await sequelize.transaction();
  try {
    const bangGiao = await BangGiao.create({
      MaBanGiao: maBanGiao,
      MaHopDong: maHopDong,
      NgayGiao: new Date(),
      TinhTrang: 'PENDING',
      MaNV: maNV || null,
    }, { transaction: t });

    // Auto-load default assets or from room's existing assets
    const taiSans = await TaiSan.findAll({ limit: 6 });
    for (let i = 0; i < DEFAULT_ASSETS.length; i++) {
      const def = DEFAULT_ASSETS[i];
      let taiSan = taiSans[i];
      if (!taiSan) {
        const cnt = await TaiSan.count({ transaction: t });
        taiSan = await TaiSan.create({
          MaTaiSan: `TS-${String(cnt + 1).padStart(3, '0')}`,
          TenTaiSan: def.tenTaiSan,
          LoaiTaiSan: def.loaiTaiSan,
          TinhTrang: 'AVAILABLE',
        }, { transaction: t });
      }
      await BangGiaoTaiSan.create({
        MaBanGiao: maBanGiao,
        MaTaiSan: taiSan.MaTaiSan,
        SoLuong: def.soLuong,
        TinhTrangLucGiao: 'Tốt',
        DaKiemTra: false,
      }, { transaction: t });
    }

    await t.commit();
    return await getHandoverByContract(maHopDong);
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

/**
 * Lấy biên bản bàn giao theo hợp đồng
 */
const getHandoverByContract = async (maHopDong) => {
  return await BangGiao.findOne({
    where: { MaHopDong: maHopDong },
    include: [
      {
        model: TaiSan, as: 'taiSans',
        through: { attributes: ['SoLuong', 'TinhTrangLucGiao', 'GhiChu', 'DaKiemTra'] }
      },
      { model: NhanVien, as: 'nhanVien', attributes: ['TenNV', 'ChucVu'] },
      {
        model: HopDongThueNha, as: 'hopDong',
        include: [{ model: Phong, as: 'phong', attributes: ['MaPhong', 'TinhTrang'] }]
      },
    ],
  });
};

/**
 * Cập nhật trạng thái kiểm tra tài sản
 */
const updateAssetCheck = async (maBanGiao, maTaiSan, data) => {
  const { daKiemTra, tinhTrangLucGiao, ghiChu } = data;
  await BangGiaoTaiSan.update(
    { DaKiemTra: daKiemTra, TinhTrangLucGiao: tinhTrangLucGiao, GhiChu: ghiChu },
    { where: { MaBanGiao: maBanGiao, MaTaiSan: maTaiSan } }
  );
  return await BangGiao.findByPk(maBanGiao, {
    include: [{ model: TaiSan, as: 'taiSans', through: { attributes: ['SoLuong', 'TinhTrangLucGiao', 'DaKiemTra'] } }]
  });
};

/**
 * Xác nhận bàn giao phòng
 */
const confirmHandover = async (maBanGiao) => {
  const bangGiao = await BangGiao.findByPk(maBanGiao, {
    include: [
      { model: TaiSan, as: 'taiSans', through: { attributes: ['DaKiemTra'] } },
      { model: HopDongThueNha, as: 'hopDong' },
    ],
  });
  if (!bangGiao) throw { statusCode: 404, message: 'Biên bản bàn giao không tồn tại' };

  // Check all assets inspected
  const unchecked = bangGiao.taiSans.filter(ts => !ts.BangGiaoTaiSan.DaKiemTra);
  if (unchecked.length > 0) {
    throw { statusCode: 400, message: `Còn ${unchecked.length} tài sản chưa được kiểm tra` };
  }

  const t = await sequelize.transaction();
  try {
    await bangGiao.update({ TinhTrang: 'COMPLETED' }, { transaction: t });

    // Update room status to OCCUPIED
    if (bangGiao.hopDong?.MaPhong) {
      await Phong.update(
        { TinhTrang: 'OCCUPIED' },
        { where: { MaPhong: bangGiao.hopDong.MaPhong }, transaction: t }
      );
      await Giuong.update(
        { TinhTrang: 'OCCUPIED' },
        { where: { MaPhong: bangGiao.hopDong.MaPhong }, transaction: t }
      );
    }

    await t.commit();
    return bangGiao;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

/**
 * Thêm tài sản vào biên bản bàn giao
 */
const addAssetToHandover = async (maBanGiao, data) => {
  const { tenTaiSan, soLuong = 1, tinhTrangLucGiao = 'Tốt' } = data;
  const count = await TaiSan.count();
  const maTaiSan = `TS-${String(count + 1).padStart(3, '0')}`;
  const taiSan = await TaiSan.create({ MaTaiSan: maTaiSan, TenTaiSan: tenTaiSan, TinhTrang: 'AVAILABLE' });
  await BangGiaoTaiSan.create({ MaBanGiao: maBanGiao, MaTaiSan: maTaiSan, SoLuong: soLuong, TinhTrangLucGiao: tinhTrangLucGiao, DaKiemTra: false });
  return taiSan;
};

module.exports = { createHandover, getHandoverByContract, updateAssetCheck, confirmHandover, addAssetToHandover, getDefaultAssets };
