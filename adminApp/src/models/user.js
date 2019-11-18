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
      userTypeId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loginType:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: true,
        isEmail: true
      },
      phoneNo: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: true
      },
      userRole: {
        type: DataTypes.STRING(100),
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
      // createdAt:{
      //   type: DataTypes.STRING,
      //   allowNull: false,
      //   defaultValue: 0,
      //   get : function()  {
      //     if(this.getDataValue('createdAt')){
      //       return this.getDataValue('createdAt').toISOString().slice(0,10);
      //     }
      //   },
      // }   
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

  return TblUser;
};
