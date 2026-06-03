/**
 * KhachHang Model
 * Represents a customer (khách hàng) of the HomeStay Dorm system.
 */
module.exports = (sequelize, DataTypes) => {
  const KhachHang = sequelize.define(
    'KhachHang',
    {
      MaKH: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Customer code (primary key)',
      },
      HoTen: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Full name of the customer',
      },
      GioiTinh: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: 'Gender',
      },
      QuocTich: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: 'Việt Nam',
        comment: 'Nationality',
      },
      GiayToTuyThan: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'ID document number (CCCD / CMND / Passport)',
      },
      SDT: {
        type: DataTypes.STRING(15),
        allowNull: true,
        comment: 'Phone number',
      },
      Email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Email address',
      },
      NgaySinh: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Date of birth',
      },
      DiaChi: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Permanent address',
      },
    },
    {
      tableName: 'KHACH_HANG',
      timestamps: false,
    }
  );

  return KhachHang;
};

