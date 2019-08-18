module.exports = (sequelize, DataTypes) => {
    const TblPetCategory = sequelize.define(
      "TblPetCategory",
      {
        petCategoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },      
        categoryName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true         
        }, 
        active: {
          type: DataTypes.ENUM,
          values: ["0", "1"],
          defaultValue: "1"
        }       
      },
      {
        tableName: "TblPetCategory",
        indexes: [
          {
            fields: ["petCategoryId"]
          }
        ]
      }
    );
  
    return TblPetCategory;
  };
  