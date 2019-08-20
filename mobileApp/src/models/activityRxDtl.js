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
            type: DataTypes.STRING(128),
            allowNull: true,
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
  