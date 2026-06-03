/**
 * ThanhToan Model
 * Represents a payment transaction (thanh toán).
 */
module.exports = (sequelize, DataTypes) => {
  const ThanhToan = sequelize.define(
    'ThanhToan',
    {
      MaThanhToan: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Payment code (primary key)',
      },
      MaHopDong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to HOP_DONG_THUE_NHA',
      },
      MaCoc: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to DAT_COC',
      },
      SoTien: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: false,
        comment: 'Payment amount',
      },
      PhuongThuc: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Payment method (e.g., cash, bank transfer)',
      },
      NgayThanhToan: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        comment: 'Date/time the payment was made',
      },
      LoaiThanhToan: {
        type: DataTypes.ENUM(
          'DEPOSIT',
          'MONTHLY_RENT',
          'SERVICE',
          'PENALTY',
          'REFUND'
        ),
        allowNull: true,
        comment: 'Category of the payment',
      },
      TinhTrang: {
        type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING',
        comment: 'Payment processing status',
      },
      GhiChu: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Additional notes',
      },
      MaSoChungTu: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'Reference / voucher number',
      },
    },
    {
      tableName: 'THANH_TOAN',
      timestamps: false,
    }
  );

  return ThanhToan;
};

