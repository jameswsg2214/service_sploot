module.exports = (sequelize, DataTypes) => {
  const TblActivityFood = sequelize.define(
    "TblActivityFood",
    {
      activityFoodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },     
       petId: {
        type: DataTypes.INTEGER,
        allowNull: false        
      },
       foodName: {
        type: DataTypes.STRING(50),
        allowNull: false        
      },
      foodWeight: {
        type: DataTypes.DECIMAL(6,3),
        allowNull: true    
      },   
      foodDate: {
        type: DataTypes.BIGINT,
        allowNull: false
      },   
      active: {
        type: DataTypes.ENUM,
        values: ["0", "1"],
        defaultValue: "1"
      }
    },
    {
      tableName: "TblActivityFood",
      indexes: [
        {
          fields: ["activityFoodId"]
        }
      ]
    }
  );

  return TblActivityFood;
};
