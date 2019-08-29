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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
      },
      rxMasterId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      medicationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATEONLY,
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



  // TblActivityRxDtl.associate = models => {
  //   TblActivityRxDtl.hasOne(models.TblMedication, {
  //     foreignKey: "medicationId",
  //     onDelete: "CASCADE"
  //   });
  //   TblActivityRxDtl.hasOne(models.TblActivityRxMaster, {
  //     foreignKey: "rxMasterId",
  //     onDelete: "CASCADE"
  //   });

  // };

  return TblActivityRxDtl;
};
