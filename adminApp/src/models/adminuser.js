  module.exports = (sequelize, DataTypes) => {
    const TblAdminUser = sequelize.define(
      "TblAdminUser",
      {
        no: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userName: {
          type: DataTypes.STRING(250),
          allowNull: true,
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: true,
          },
          email: {
            type: DataTypes.STRING(400),
            allowNull: true,
          },
          userRole: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          active: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },

      },
      {
        tableName: "TblAdminUser",
        indexes: [
          {
            fields: ["no"]
          }
        ]
      }
    );
  
    return TblAdminUser;
  };
  