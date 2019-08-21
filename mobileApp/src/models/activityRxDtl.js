module.exports = (sequelize, DataTypes) => {
  const TblActivityRxDtl = sequelize.define(
    "TblActivityRxDtl",
    {
      rxDtlId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      rxMasterId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      medId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      startDate: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      endDate: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      active: {
        type: DataTypes.ENUM,
        values: ["0", "1"],
        defaultValue: "1"
      }
    },
    {
      tableName: "TblActivityRxDtl",
      indexes: [
        {
          fields: ["rxDtlId"]
        }
      ]
    }
  );

  return TblActivityRxDtl;
};
