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
            foreignKey: true,
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
  
     TblUserOtp.associate = models => {
      // console.log("models List", models);
  
      // TblUser.belongsTo(models.TblUserDepartment, {
      //   foreignKey: "departmentId",
      //   onDelete: "CASCADE"
      // });
      // TblUser.belongsTo(models.TblUserTypes, {
      //   foreignKey: "userTypeId",
      //   onDelete: "CASCADE"
      // });
      // TblUser.hasMany(models.TblJourneyPlanMaster, {
      //   foreignKey: "userId",
      //   onDelete: "CASCADE"
      // });
    //   TblUser.hasMany(models.TblUserRoles, {
    //     foreignKey: "userId",
    //     onDelete: "CASCADE"
    //   });
    TblUserOtp.hasOne(models.TblUser, {
        foreignKey: "userId"
      });
    };
    return TblUserOtp;
  };
  