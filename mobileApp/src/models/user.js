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
