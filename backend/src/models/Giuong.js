/**
 * Giuong Model
 * Represents a bed (giường) within a room.
 */
module.exports = (sequelize, DataTypes) => {
  const Giuong = sequelize.define(
    'Giuong',
    {
      MaGiuong: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Bed code (primary key)',
      },
      MaPhong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to PHONG',
      },
      GiaGiuong: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
        comment: 'Rental price of the bed',
      },
      TinhTrang: {
        type: DataTypes.ENUM(
          'AVAILABLE',
          'PENDING',
          'RESERVED',
          'OCCUPIED',
          'BROKEN'
        ),
        allowNull: false,
        defaultValue: 'AVAILABLE',
        comment: 'Current status of the bed',
      },
    },
    {
      tableName: 'GIUONG',
      timestamps: false,
    }
  );

  return Giuong;
};

