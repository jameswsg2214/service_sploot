module.exports = (sequelize, DataTypes) => {
    const TblCity = sequelize.define(
      "TblCity",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
          },
        stateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      },
      {
        tableName: "TblCity",
        indexes: [
          {
            fields: ["id"]
          }
        ]
      }
    );
  
    return TblCity;
  };
  