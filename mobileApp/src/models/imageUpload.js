module.exports = (sequelize, DataTypes) => {
    const TblImageUpload = sequelize.define(
      "TblImageUpload",
      {
        imageId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        imageCategoryId: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        imagePath: {
          type: DataTypes.ARRAY(DataTypes.STRING(256)),
          allowNull: true
        },
        uploadDate: {
          type: DataTypes.DATEONLY,
          allowNull: true
        }
      },
      {
        tableName: "TblImageUpload",
        indexes: [
          {
            fields: ["imageId"]
          }
        ]
      }
    );
    return TblImageUpload;
  };
  