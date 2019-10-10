module.exports = (sequelize, DataTypes) => {
    const TblCms = sequelize.define(
      "TblCms",
      {
        no: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        heading: {
          type: DataTypes.STRING(50),
          allowNull: true,
          unique: true
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false
        }, 
      },
      {
        tableName: "TblCms",
        indexes: [
          {
            fields: ["no"]
          }
        ]
      }
    );
  
    return TblCms;
  };
  