module.exports = (sequelize, DataTypes) => {
    const TblUserOtp = sequelize.define(
      "TblUserOtp",
      {
        id:{
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        userType: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        email: {
          type: DataTypes.STRING(128),
          unique: true,
          allowNull: true
        },
        otp:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
      },
      {
        tableName: "TblUserOtp",
        indexes: [
          {
            fields: ["userId"]
          }
        ]
      }
    );
  
  
    return TblUserOtp;
  };
  