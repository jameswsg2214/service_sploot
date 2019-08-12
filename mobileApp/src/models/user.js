module.exports = (sequelize, DataTypes) => {
    const TblUser = sequelize.define(
      "TblUser",
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userType: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        userName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          isEmail: true
        },
        password: {
          type: DataTypes.STRING(128),
          allowNull: false
        },
        email: {
          type: DataTypes.STRING(128),
          unique: true,
          allowNull: true
        },
        phoneNo: {
          type: DataTypes.STRING(20),
          unique: true,
          allowNull: true
        },
       
        active: {
          type: DataTypes.ENUM,
          values: ["0", "1"],
          defaultValue: "1"
        },
        verified:{
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        createdBy: {
          type: DataTypes.STRING(64),
          allowNull: true
        },
        modifiedBy: {
          type: DataTypes.STRING(64),
          allowNull: false
        }
      },
      {
        tableName: "TblUser",
        indexes: [
          {
            fields: ["userId"]
          }
        ]
      }
    );
  
     TblUser.associate = models => {
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
    //   TblUser.hasOne(models.TblArea, {
    //     foreignKey: "areaId"
    //   });
    };
    return TblUser;
  };
  