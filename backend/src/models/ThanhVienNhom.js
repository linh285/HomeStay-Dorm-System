/**
 * ThanhVienNhom Model
 * Junction table linking customers (KhachHang) to groups (Nhom).
 * Composite primary key: MaNhom + MaKH.
 */
module.exports = (sequelize, DataTypes) => {
  const ThanhVienNhom = sequelize.define(
    'ThanhVienNhom',
    {
      MaNhom: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Foreign key to NHOM',
      },
      MaKH: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Foreign key to KHACH_HANG',
      },
      TrangThai: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED'),
        allowNull: false,
        defaultValue: 'PENDING',
        comment: 'Membership approval status',
      },
    },
    {
      tableName: 'THANHVIEN_NHOM',
      timestamps: false,
    }
  );

  return ThanhVienNhom;
};

