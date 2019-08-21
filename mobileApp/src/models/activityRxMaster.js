module.exports = (sequelize, DataTypes) => {
  const TblActivityRxMaster = sequelize.define(
    "TblActivityRxMaster",
    {
      rxMasterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
       petId: {
        type: DataTypes.INTEGER,
        allowNull: false        
      }, 
      doctorId: {
          type: DataTypes.INTEGER,
          allowNull: false        
        }, 
        durationFrom: {
          type: DataTypes.BIGINT,
          allowNull: false        
        },
        durationTo: {
          type: DataTypes.BIGINT,
          allowNull: false        
        },
        photo: {
          type: DataTypes.STRING, 
          allowNull: false,
        },    
      rxDate: {
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
      tableName: "TblActivityRxMaster",
      indexes: [
        {
          fields: ["rxMasterId"]
        }
      ]
    }
  );

  return TblActivityRxMaster;
};
