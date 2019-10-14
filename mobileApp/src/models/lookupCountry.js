module.exports = (sequelize, DataTypes) => {
    const TblCountry = sequelize.define(
      "TblCountry",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        countryCode: {
          type: DataTypes.STRING(2),
          allowNull: false,
        },
        countryName: {
            type: DataTypes.STRING(150),
            allowNull: false,
          }
      },
      {
        tableName: "TblCountry",
        indexes: [
          {
            fields: ["id"]
          }
        ]
      }
    );
  
    return TblCountry;
  };
  