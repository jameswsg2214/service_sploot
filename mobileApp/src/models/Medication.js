module.exports = (sequelize, DataTypes) => {
    const TblMedication = sequelize.define(
        "TblMedication",
        {
            medicationId: {
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
            brandId:
            {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,

            },
            drugName: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            drugType: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            route: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            age: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            dose: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            medDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },

        },
        {
            tableName: "TblMedication",
            indexes: [
                {
                    fields: ["medicationId"]
                }
            ]
        }
    );

    return TblMedication;
};
