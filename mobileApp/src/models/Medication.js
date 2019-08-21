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
            petCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            brandId:
                {
                    type: DataTypes.INTEGER,
                    allowNull: false
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
            Age: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            dose: {
                type: DataTypes.STRING(50),
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
