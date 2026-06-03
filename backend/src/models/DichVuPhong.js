/**
 * DichVuPhong Model
 * Junction table linking services (DichVu) to rooms (Phong).
 * Composite primary key: MaPhong + MaDV.
 */
module.exports = (sequelize, DataTypes) => {
  const DichVuPhong = sequelize.define(
    'DichVuPhong',
    {
      MaPhong: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Foreign key to PHONG (part of composite PK)',
      },
      MaDV: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Foreign key to DICH_VU (part of composite PK)',
      },
    },
    {
      tableName: 'DICHVU_PHONG',
      timestamps: false,
    }
  );

  return DichVuPhong;
};

