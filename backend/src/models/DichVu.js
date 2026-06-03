/**
 * DichVu Model
 * Represents a service (dá»‹ch vá»? offered by the HomeStay Dorm system.
 */
module.exports = (sequelize, DataTypes) => {
  const DichVu = sequelize.define(
    'DichVu',
    {
      MaDV: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Service code (primary key)',
      },
      TenDV: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Service name',
      },
      Gia: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
        comment: 'Service price',
      },
      NgayApDung: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Effective date of the service pricing',
      },
      MoTa: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Service description',
      },
    },
    {
      tableName: 'DICH_VU',
      timestamps: false,
    }
  );

  return DichVu;
};

