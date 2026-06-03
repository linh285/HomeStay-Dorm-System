/**
 * Nhom Model
 * Represents a group (nhÃ³m) of customers who jointly rent a room.
 */
module.exports = (sequelize, DataTypes) => {
  const Nhom = sequelize.define(
    'Nhom',
    {
      MaNhom: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Group code (primary key)',
      },
      TenNhom: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Group name',
      },
      MaDaiDien: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to KHACH_HANG â€?group representative',
      },
      MaHopDong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Associated rental contract code',
      },
      NgayTao: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        comment: 'Date the group was created',
      },
      TrangThai: {
        type: DataTypes.ENUM('ACTIVE', 'CANCELLED', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'ACTIVE',
        comment: 'Current status of the group',
      },
    },
    {
      tableName: 'NHOM',
      timestamps: false,
    }
  );

  return Nhom;
};

