/**
 * ChiTietKhauTru Model
 * Represents individual deduction line items during a room return (chi tiết khấu tr�?.
 * Composite primary key: STT (autoincrement) + MaTra.
 */
module.exports = (sequelize, DataTypes) => {
  const ChiTietKhauTru = sequelize.define(
    'ChiTietKhauTru',
    {
      STT: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Sequential line number (part of composite PK, auto-incremented)',
      },
      MaTra: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Foreign key to TRA_PHONG (part of composite PK)',
      },
      LoaiPhi: {
        type: DataTypes.ENUM(
          'DIEN',
          'NUOC',
          'DICH_VU',
          'HU_HONG',
          'PHAT',
          'NO_TIEN_PHONG'
        ),
        allowNull: true,
        comment: 'Type of deduction fee',
      },
      SoTien: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
        comment: 'Deduction amount',
      },
      GhiChu: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Additional notes for this deduction',
      },
    },
    {
      tableName: 'CHITIETKHAUTRU',
      timestamps: false,
    }
  );

  return ChiTietKhauTru;
};

