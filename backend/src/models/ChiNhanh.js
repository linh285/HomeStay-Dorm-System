/**
 * ChiNhanh Model
 * Represents a branch (chi nhánh) of the HomeStay Dorm system.
 */
module.exports = (sequelize, DataTypes) => {
  const ChiNhanh = sequelize.define(
    'ChiNhanh',
    {
      MaChiNhanh: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Branch code (primary key)',
      },
      TenChiNhanh: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Branch name',
      },
      DiaChi: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Branch address',
      },
      SDT: {
        type: DataTypes.STRING(15),
        allowNull: true,
        comment: 'Branch phone number',
      },
      Email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: 'Branch email address',
      },
    },
    {
      tableName: 'CHI_NHANH',
      timestamps: false,
    }
  );

  return ChiNhanh;
};

