module.exports = (sequelize, DataTypes) => {
  const TblActivityWeight = sequelize.define(
    "TblActivityWeight",
    {
      activityWeightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false        
      },
      weightValue: {
        type: DataTypes.DECIMAL(6,3),
        allowNull: false    
      },   
      weighDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },   
      active: {
        type: DataTypes.ENUM,
        values: ["0", "1"],
        defaultValue: "1"
      }
    },
    {
      tableName: "TblActivityWeight",
      indexes: [
        {
          fields: ["activityWeightId"]
        }
      ]
    }
  );

  return TblActivityWeight;
};
