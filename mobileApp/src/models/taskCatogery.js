module.exports = (sequelize, DataTypes) => {
    const TblTaskCategory = sequelize.define(
        "TblTaskCategory",
        {
            taskId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            active: {
                type: DataTypes.ENUM,
                values: ["0", "1"],
                defaultValue: "1"
            }
        },
        {
            tableName: "TblTaskCategory",
            indexes: [
                {
                    fields: ["taskId"]
                }
            ]
        }
    );

    return TblTaskCategory;
};
