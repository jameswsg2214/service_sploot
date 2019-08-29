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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
      },  
      petCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      breedName: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      breedTypeId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
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


  return TblBreedMaster;
};
