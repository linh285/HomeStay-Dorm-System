/**
 * HopDongThueNha Model
 * Represents a rental contract (hợp đồng thuê nhà).
 */
module.exports = (sequelize, DataTypes) => {
  const HopDongThueNha = sequelize.define(
    'HopDongThueNha',
    {
      MaHopDong: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Contract code (primary key)',
      },
      MaPhong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to PHONG',
      },
      MaNhom: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to NHOM',
      },
      NgayBatDau: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Contract start date',
      },
      NgayKetThuc: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Contract end date',
      },
      GiaThue: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
        comment: 'Agreed monthly rent',
      },
      NoiQuy: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'House rules included in the contract',
      },
      TinhTrang: {
        type: DataTypes.ENUM(
          'PENDING',
          'PENDING_FIRST_PAYMENT',
          'ACTIVE',
          'EXPIRED',
          'TERMINATED',
          'CANCELLED'
        ),
        allowNull: false,
        defaultValue: 'PENDING',
        comment: 'Contract status',
      },
      NgayKy: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Date the contract was signed',
      },
      MaNVPhuTrach: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to NHAN_VIEN �?responsible staff',
      },
    },
    {
      tableName: 'HOP_DONG_THUE_NHA',
      timestamps: false,
    }
  );

  return HopDongThueNha;
};

