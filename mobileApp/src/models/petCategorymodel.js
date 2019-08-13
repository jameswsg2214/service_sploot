module.exports = (sequelize, DataTypes) => {
    const PetCategory = sequelize.define(
      "PetCategory",
      {
        PetCategoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
      
        CategoryName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          isEmail: true
        },
        
      },
      {
        tableName: "PetCategory",
        indexes: [
          {
            fields: ["PetCategoryId"]
          }
        ]
      }
    );
  
    return PetCategory;
  };
  