/**
 * LichXemPhong Model
 * Represents a scheduled room viewing appointment (lịch xem phòng).
 */
module.exports = (sequelize, DataTypes) => {
  const LichXemPhong = sequelize.define(
    'LichXemPhong',
    {
      MaLich: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Appointment code (primary key)',
      },
      MaKH: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to KHACH_HANG',
      },
      MaPhong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to PHONG',
      },
      MaNV: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to NHAN_VIEN �?assigned staff',
      },
      NgayXem: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Scheduled viewing date',
      },
      GioXem: {
        type: DataTypes.TIME,
        allowNull: true,
        comment: 'Scheduled viewing time',
      },
      KetQua: {
        type: DataTypes.ENUM('INTERESTED', 'NOT_INTERESTED', 'BOOKED'),
        allowNull: true,
        comment: 'Outcome of the room viewing',
      },
      GhiChu: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Additional notes',
      },
      TrangThai: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING',
        comment: 'Appointment status',
      },
    },
    {
      tableName: 'LICH_XEM_PHONG',
      timestamps: false,
    }
  );

  return LichXemPhong;
};

