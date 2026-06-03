/**
 * BangGiaoTaiSan Model
 * Junction table linking handover records (BangGiao) to assets (TaiSan).
 * Composite primary key: MaBanGiao + MaTaiSan.
 */
module.exports = (sequelize, DataTypes) => {
  const BangGiaoTaiSan = sequelize.define(
    'BangGiaoTaiSan',
    {
      MaBanGiao: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Foreign key to BANG_GIAO (part of composite PK)',
      },
      MaTaiSan: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Foreign key to TAI_SAN (part of composite PK)',
      },
      SoLuong: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        comment: 'Quantity of this asset in the handover',
      },
      TinhTrangLucGiao: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Condition of the asset at the time of handover',
      },
      GhiChu: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Additional notes about this asset in the handover',
      },
      DaKiemTra: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Whether the asset has been inspected/checked',
      },
    },
    {
      tableName: 'BANGGIAO_TAISAN',
      timestamps: false,
    }
  );

  return BangGiaoTaiSan;
};

