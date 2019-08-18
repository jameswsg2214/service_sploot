module.exports = (sequelize, DataTypes) => {
  const TblPetMaster = sequelize.define(
    "TblPetMaster",
    {
      petId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      petCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true

      },      
      photo:{
        type:  DataTypes.STRING(128),
        allowNull: false,
       },
      petName: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      breedId:{
        type:  DataTypes.INTEGER,
        allowNull: false,
      foreignKey: true
       },
      sex: {
        type: DataTypes.STRING(128),
        allowNull: true
      },
      
       dob:{
        type:  DataTypes.BIGINT,
        allowNull: true,
       },
       monthlyCycle:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
       period:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
       height:{
        type:  DataTypes.DECIMAL(2,2),
        allowNull: true,
       },
       length:{
        type:  DataTypes.DECIMAL(2,2),
        allowNull: true,
       },
       weight:{
        type:  DataTypes.DECIMAL(6,3),
        allowNull: true,
       },
       color:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
       marks:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
       parentFatherName:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
        parentFatherBreedName:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
        parentAddress:{
        type:  DataTypes.STRING(150),
        allowNull: true,
       },
       parenOwnerName:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
       parenMobileNumber:{
        type:  DataTypes.STRING(50),
        allowNull: true,
       },
        parentOwnerAddress:{
        type:  DataTypes.STRING(150),
        allowNull: true,
       },
       drName:{
        type:  DataTypes.STRING(50),
        allowNull: true,
       },
       drhospitalName:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
        drMobile:{
        type:  DataTypes.STRING(50),
        allowNull: true,
       },drEmail:{
        type:  DataTypes.STRING(50),
        allowNull: true,
       },
       drAddress:{
        type:  DataTypes.STRING(150),
        allowNull: true,
       },
       drCity:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
       drState:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },
       drCountry:{
        type:  DataTypes.STRING(128),
        allowNull: true,
       },      
       status:{
        type: DataTypes.ENUM,
          values: ["0", "1"],
          defaultValue: "1"
       }
    },
    {
      tableName: "TblPetMaster",
      indexes: [
        {
          fields: ["petId"]
        }
      ]
    }
  );

  TblPetMaster.associate = models => {
    TblPetMaster.hasOne(models.TblBreedMaster, {
      foreignKey: "breedId",
      onDelete: "CASCADE"
    });
    TblPetMaster.hasOne(models.TblPetCategory, {
      foreignKey: "petCategoryId",
      onDelete: "CASCADE"
    });

  };

  return TblPetMaster;
};
