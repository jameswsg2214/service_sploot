module.exports = (sequelize, DataTypes) => {
    const TblUserProfile = sequelize.define(
      "TblUserProfile",
      {
        profileId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
          },
        userId: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        UserName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(128),
          allowNull: false,
          isEmail: true
        },
        address: {
          type: DataTypes.STRING(250),
          allowNull: false,
        },
        country: {
            type: DataTypes.STRING(250),
            allowNull: false,
          },
          state: {
            type: DataTypes.STRING(250),
            allowNull: false,
          },
          city: {
            type: DataTypes.STRING(250),
            allowNull: false,
          },
          pin: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
        number: {
         type: DataTypes.STRING(20),
          allowNull: false
        },
        imagePath: {
          type: DataTypes.STRING(500),
          allowNull: false
        },
      },
      {
        tableName: "TblUserProfile",
        indexes: [
          {
            fields: ["profileId"]
          }
        ]
      }
    );
  
    return TblUserProfile;
  };
  