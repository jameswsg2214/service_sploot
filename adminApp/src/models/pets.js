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
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        petCategoryId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        photo: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        petName: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        breedId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        sex: {
          type: DataTypes.STRING(128),
          allowNull: true
        },
  
        dob: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        monthlyCycle: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        period: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        height: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },
        length: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },
        weight: {
          type: DataTypes.DECIMAL,
          allowNull: true,
        },
        color: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        marks: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        birthPlace: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        parentFatherName: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        parentFatherBreedName: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        parentMotherName: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        parentMotherBreedName: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        parentAddress: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        petOwnerName: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        petOwnerMobileNumber: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        petOwnerAddress: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        drName: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        drhospitalName: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        drMobile: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        drEmail: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        drAddress: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        drCity: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        drPincode: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        drState: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        drCountry: {
          type: DataTypes.STRING(128),
          allowNull: true,
        },
        status: {
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
  
    return TblPetMaster;
  };  
  