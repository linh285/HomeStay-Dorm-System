/**
 * NhanVien Model
 * Represents a staff member (nhân viên) of the HomeStay Dorm system.
 */
module.exports = (sequelize, DataTypes) => {
  const NhanVien = sequelize.define(
    'NhanVien',
    {
      MaNV: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Staff code (primary key)',
      },
      MaChiNhanh: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to CHI_NHANH',
      },
      TenNV: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Full name of the staff member',
      },
      ChucVu: {
        type: DataTypes.ENUM('SALE', 'MANAGER', 'ACCOUNTANT', 'ADMIN'),
        allowNull: true,
        comment: 'Staff position / role',
      },
      SDT: {
        type: DataTypes.STRING(15),
        allowNull: true,
        comment: 'Phone number',
      },
      Email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        comment: 'Email address (used as login)',
      },
      MatKhau: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Hashed password',
      },
      NgayVaoLam: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Employment start date',
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: 'Whether the staff account is active',
      },
    },
    {
      tableName: 'NHAN_VIEN',
      timestamps: false,
    }
  );

  return NhanVien;
};

