/**
 * QuyDinh Model
 * Represents a regulation or policy (quy định) of the HomeStay Dorm system.
 */
module.exports = (sequelize, DataTypes) => {
  const QuyDinh = sequelize.define(
    'QuyDinh',
    {
      MaQuyDinh: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Regulation code (primary key)',
      },
      TieuDe: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: 'Regulation title',
      },
      NhomQuyDinh: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: 'Regulation group / category',
      },
      NoiDung: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Full regulation content',
      },
      NgayHieuLuc: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Effective start date of the regulation',
      },
      NgayHetHieuLuc: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Expiry date of the regulation (null = no expiry)',
      },
      TrangThai: {
        type: DataTypes.ENUM('ACTIVE', 'UPCOMING', 'EXPIRED'),
        allowNull: false,
        defaultValue: 'ACTIVE',
        comment: 'Current status of the regulation',
      },
      UuTien: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: 'MEDIUM',
        comment: 'Priority level (e.g., LOW, MEDIUM, HIGH)',
      },
      ApDungCho: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Applicability scope (e.g., all branches, specific rooms)',
      },
      NgayTao: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        comment: 'Date the regulation was created',
      },
    },
    {
      tableName: 'QUY_DINH',
      timestamps: false,
    }
  );

  return QuyDinh;
};

