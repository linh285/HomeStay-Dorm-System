/**
 * ChiTietThue Model
 * Represents the rental detail per bed within a contract (chi tiết thuê).
 * Composite primary key: MaHopDong + MaGiuong.
 */
module.exports = (sequelize, DataTypes) => {
  const ChiTietThue = sequelize.define(
    'ChiTietThue',
    {
      MaHopDong: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Foreign key to HOP_DONG_THUE_NHA (part of composite PK)',
      },
      MaGiuong: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: true,
        comment: 'Foreign key to GIUONG (part of composite PK)',
      },
      MaKH: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to KHACH_HANG �?the customer renting this bed',
      },
      GiaThueThucTe: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
        comment: 'Actual rental price applied for this bed',
      },
    },
    {
      tableName: 'CHI_TIET_THUE',
      timestamps: false,
    }
  );

  return ChiTietThue;
};

