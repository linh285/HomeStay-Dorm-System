/**
 * DatCoc Model
 * Represents a security deposit record (đặt cọc).
 */
module.exports = (sequelize, DataTypes) => {
  const DatCoc = sequelize.define(
    'DatCoc',
    {
      MaCoc: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Deposit code (primary key)',
      },
      MaHopDong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to HOP_DONG_THUE_NHA',
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
      MaGiuong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to GIUONG',
      },
      NguoiPheDuyet: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to NHAN_VIEN �?approver',
      },
      NgayDatCoc: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        comment: 'Date the deposit was made',
      },
      SoTienCoc: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
        comment: 'Deposit amount',
      },
      PhuongThucThanhToan: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Payment method used for the deposit',
      },
      TinhTrang: {
        type: DataTypes.ENUM(
          'PENDING_APPROVAL',
          'PENDING_PAYMENT',
          'APPROVED',
          'EXPIRED',
          'CANCELLED',
          'REJECTED'
        ),
        allowNull: false,
        defaultValue: 'PENDING_PAYMENT',
        comment: 'Current status of the deposit',
      },
      ThoiGianHetHan: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Deposit expiry date/time',
      },
      ThoiGianPheDuyet: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: 'Date/time the deposit was approved',
      },
      GhiChu: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Additional notes',
      },
    },
    {
      tableName: 'DAT_COC',
      timestamps: false,
    }
  );

  return DatCoc;
};

