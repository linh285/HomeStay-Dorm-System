/**
 * Phong Model
 * Represents a room (phòng) within a branch.
 */
module.exports = (sequelize, DataTypes) => {
  const Phong = sequelize.define(
    'Phong',
    {
      MaPhong: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Room code (primary key)',
      },
      MaChiNhanh: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to CHI_NHANH',
      },
      GiaThue: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: false,
        comment: 'Rental price of the room',
      },
      KhuVuc: {
        type: DataTypes.STRING(10),
        allowNull: true,
        comment: 'Area / zone of the room',
      },
      Tang: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Floor number',
      },
      SucChua: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Maximum occupancy of the room',
      },
      TinhTrang: {
        type: DataTypes.ENUM(
          'AVAILABLE',
          'PENDING',
          'RESERVED',
          'OCCUPIED',
          'MAINTENANCE',
          'INACTIVE'
        ),
        allowNull: false,
        defaultValue: 'AVAILABLE',
        comment: 'Current status of the room',
      },
      GhiChu: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Additional notes about the room',
      },
    },
    {
      tableName: 'PHONG',
      timestamps: false,
    }
  );

  return Phong;
};

