module.exports = (sequelize, DataTypes) => {
    const TblStates = sequelize.define(
      "TblStates",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        code: {
          type: DataTypes.STRING(2),
          allowNull: false,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
          },
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      },
      {
        tableName: "TblStates",
        indexes: [
          {
            fields: ["id"]
          }
        ]
      }
    );
  
    return TblStates;
  };
  