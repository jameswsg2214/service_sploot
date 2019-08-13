module.exports = (sequelize, DataTypes) => {
  const BreedMaster = sequelize.define(
    "BreedMaster",
    {
      BreedId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    
      PetCategoryId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        foreignKey: true
      },
      BreedName: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      BreedTypeId: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: false,
        foreignKey: true
      },    
    },
    {
      tableName: "BreedMaster",
      indexes: [
        {
          fields: ["BreedId"]
        }
      ]
    }
  );

  BreedMaster.associate = models => {
    BreedMaster.hasOne(models.BreedTypeID, {
      foreignKey: "BreedTypeId",
      onDelete: "CASCADE"
    });
    BreedMaster.hasOne(models.PetCategory, {
      foreignKey: "PetCategoryId",
      onDelete: "CASCADE"
    });

  };

  return BreedMaster;
};
