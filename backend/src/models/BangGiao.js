/**
 * BangGiao Model
 * Represents a room/asset handover record (bÃ n giao).
 */
module.exports = (sequelize, DataTypes) => {
  const BangGiao = sequelize.define(
    'BangGiao',
    {
      MaBanGiao: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Handover code (primary key)',
      },
      MaHopDong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to HOP_DONG_THUE_NHA',
      },
      NgayGiao: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Date/time of the handover',
      },
      TinhTrang: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING',
        comment: 'Handover status',
      },
      MaNV: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to NHAN_VIEN â€?staff who performed the handover',
      },
    },
    {
      tableName: 'BANG_GIAO',
      timestamps: false,
    }
  );

  return BangGiao;
};

