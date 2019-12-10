module.exports = (sequelize, DataTypes) => {
    const TblPet = sequelize.define(
      "TblPet",
      {
        petId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        petName: {
          type: DataTypes.STRING,
          allowNull: true
        },
        age: {
          type: DataTypes.STRING,
          allowNull: true
        },
        sex: {
          type: DataTypes.STRING,
          allowNull: true
        },
        petCategoryId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        breedId: {
          type: DataTypes.STRING,
          allowNull: true,
        } 
      },
      {
        tableName: "TblPet",
        indexes: [
          {
            fields: ["petId"]
          }
        ]
      }
    );
  
    return TblPet;
  };  
  