module.exports = (sequelize, DataTypes) => {
    const TblActivityRxFreq = sequelize.define(
      "TblActivityRxFreq",
      {
        rxFreqId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        rxDtlId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        freqInTake: {
          type: DataTypes.JSON,
          allowNull: false
        },
        active: {
          type: DataTypes.ENUM,
          values: ["0", "1"],
          defaultValue: "1"
        }
      },
      {
        tableName: "TblActivityRxFreq",
        indexes: [
          {
            fields: ["rxFreqId"]
          }
        ]
      }
    );
  
    return TblActivityRxFreq;
  };
  