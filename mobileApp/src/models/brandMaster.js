module.exports = (sequelize, DataTypes) => {
    const TblbrandMaster = sequelize.define(
        "TblbrandMaster",
        {
            brandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },

            brandName: {
                type: DataTypes.STRING(50),
                allowNull: false
            },

        },
        {
            tableName: "TblbrandMaster",
            indexes: [
                {
                    fields: ["brandId"]
                }
            ]
        }
    );

    return TblbrandMaster;
};
