module.exports = (sequelize, DataTypes) => {
  const TblActivityMedicine = sequelize.define(
    "TblActivityMedicine",
    {
      activityMedicineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false        
      },
        medicineTypeId:
        {
            type:DataTypes.INTEGER,
             allowNull: false
        },      
       medicineName: {
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
      tableName: "TblActivityMedicine",
      indexes: [
        {
          fields: ["activityMedicineId"]
        }
      ]
    }
  );

  return TblActivityMedicine;
};
