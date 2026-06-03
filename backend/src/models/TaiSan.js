/**
 * TaiSan Model
 * Represents a physical asset (tài sản) managed by the HomeStay Dorm system.
 */
module.exports = (sequelize, DataTypes) => {
  const TaiSan = sequelize.define(
    'TaiSan',
    {
      MaTaiSan: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Asset code (primary key)',
      },
      TenTaiSan: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Asset name',
      },
      LoaiTaiSan: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'Asset category / type',
      },
      TinhTrang: {
        type: DataTypes.ENUM('AVAILABLE', 'IN_USE', 'BROKEN', 'LOST'),
        allowNull: false,
        defaultValue: 'AVAILABLE',
        comment: 'Current condition / status of the asset',
      },
    },
    {
      tableName: 'TAI_SAN',
      timestamps: false,
    }
  );

  return TaiSan;
};

