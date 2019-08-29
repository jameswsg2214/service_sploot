module.exports = (sequelize, DataTypes) => {
  const TblBreedType = sequelize.define(
    "TblBreedType",
    {
      breedTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      breedTypeName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        isEmail: true
      },
      active: {
        type: DataTypes.ENUM,
        values: ["0", "1"],
        defaultValue: "1"
      }
    },
    {
      tableName: "TblBreedType",
      indexes: [
        {
          fields: ["breedTypeId"]
        }
      ]
    }
  );

  return TblBreedType;
};
