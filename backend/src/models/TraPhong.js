/**
 * TraPhong Model
 * Represents a room return / check-out record (tr�?phòng).
 */
module.exports = (sequelize, DataTypes) => {
  const TraPhong = sequelize.define(
    'TraPhong',
    {
      MaTra: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Room return code (primary key)',
      },
      MaHopDong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to HOP_DONG_THUE_NHA',
      },
      NgayYeuCau: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        comment: 'Date/time the check-out request was made',
      },
      NgayTraDuKien: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Planned check-out date',
      },
      NgayTraThucTe: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Actual check-out date',
      },
      TinhTrangPhong: {
        type: DataTypes.ENUM(
          'GOOD',
          'DIRTY',
          'DAMAGED',
          'SEVERELY_DAMAGED'
        ),
        allowNull: true,
        comment: 'Room condition at the time of return',
      },
      LyDo: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Reason for early termination or check-out',
      },
      TyLeHoanCoc: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        comment: 'Deposit refund percentage (0�?00)',
      },
      SoTienHoan: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
        comment: 'Actual refund amount after deductions',
      },
      TrangThai: {
        type: DataTypes.ENUM('PENDING', 'INSPECTING', 'INSPECTED', 'COMPLETED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING',
        comment: 'Check-out process status',
      },
      MaNVXuLy: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to NHAN_VIEN �?staff handling the check-out',
      },
    },
    {
      tableName: 'TRA_PHONG',
      timestamps: false,
    }
  );

  return TraPhong;
};

