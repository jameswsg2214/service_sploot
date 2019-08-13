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
      email: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: true
      },
      otp:{
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      verified:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    },
    {
      tableName: "TblUserOtp",
      indexes: [
        {
          fields: ["id"]
        }
      ]
    }
  );

  return TblUserOtp;
};
