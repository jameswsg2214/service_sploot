module.exports = (sequelize, DataTypes) => {
  const BreedTypeID = sequelize.define(
    "BreedTypeID",
    {
      BreedTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    
      BreedTypeName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        isEmail: true
      },
    },
    {
      tableName: "BreedTypeID",
      indexes: [
        {
          fields: ["BreedTypeId"]
        }
      ]
    }
  );

  return BreedTypeID;
};
