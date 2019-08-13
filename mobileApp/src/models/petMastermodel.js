module.exports = (sequelize, DataTypes) => {
  const PetMaster = sequelize.define(
    "PetMaster",
    {
      PetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    
      PetName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        isEmail: true
      },
      PetCategoryId: {
        type: DataTypes.STRING(128),
        allowNull: false,
        foreignKey: true

      },
      Sex: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      BreedId:{
        type:  DataTypes.STRING(128),
        allowNull: false,
        foreignKey: true
       },
       DOB:{
        type:  DataTypes.STRING(128),
        allowNull: false,
       },
       Color:{
        type:  DataTypes.STRING(128),
        allowNull: false,
       },
       Photo:{
        type:  DataTypes.STRING(128),
        allowNull: false,
       },
       OwnerId:{
        type:  DataTypes.STRING(128),
        allowNull: false,
       },
       MonthlyCycle:{
        type:  DataTypes.STRING(128),
        allowNull: false,
       },
       Period:{
        type:  DataTypes.STRING(128),
        allowNull: false,
       },
       Weight:{
        type:  DataTypes.STRING(128),
        allowNull: false,
       },
       Status:{
        type: DataTypes.ENUM,
          values: ["0", "1"],
          defaultValue: "1"
       },


    },
    {
      tableName: "PetMaster",
      indexes: [
        {
          fields: ["PetId"]
        }
      ]
    }
  );

  PetMaster.associate = models => {
    PetMaster.hasOne(models.BreedMaster, {
      foreignKey: "BreedId",
      onDelete: "CASCADE"
    });
    PetMaster.hasOne(models.PetCategory, {
      foreignKey: "PetCategoryId",
      onDelete: "CASCADE"
    });

  };

  return PetMaster;
};
