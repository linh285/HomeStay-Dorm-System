/**
 * YeuCauThue Model
 * Represents a rental request submitted by a customer (yêu cầu thuê).
 */
module.exports = (sequelize, DataTypes) => {
  const YeuCauThue = sequelize.define(
    'YeuCauThue',
    {
      MaYeuCauThue: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        comment: 'Rental request code (primary key)',
      },
      MaKH: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Foreign key to KHACH_HANG',
      },
      LoaiPhong: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: 'Desired room type',
      },
      GiaMongMuon: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
        comment: 'Desired price range',
      },
      TieuChiKhac: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Other criteria or requirements',
      },
      NgayTao: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        comment: 'Date the request was created',
      },
    },
    {
      tableName: 'YEU_CAU_THUE',
      timestamps: false,
    }
  );

  return YeuCauThue;
};

