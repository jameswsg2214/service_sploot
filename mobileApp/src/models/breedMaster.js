module.exports = (sequelize, DataTypes) => {
  const TblBreedMaster = sequelize.define(
    "TblBreedMaster",
    {
      breedId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },    
      petCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        foreignKey: true
      },
      breedName: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      breedTypeId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        foreignKey: true
      },  
      active: {
        type: DataTypes.ENUM,
        values: ["0", "1"],
        defaultValue: "1"
      }  
    },
    {
      tableName: "TblBreedMaster",
      indexes: [
        {
          fields: ["breedId"]
        }
      ]
    }
  );

  TblBreedMaster.associate = models => {
    TblBreedMaster.hasOne(models.TblBreedType, {
      foreignKey: "breedTypeId",
      onDelete: "CASCADE"
    });
    TblBreedMaster.hasOne(models.TblPetCategory, {
      foreignKey: "petCategoryId",
      onDelete: "CASCADE"
    });

  };

  return TblBreedMaster;
};
