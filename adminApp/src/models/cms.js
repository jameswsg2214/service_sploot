module.exports = (sequelize, DataTypes) => {
  const TblCms = sequelize.define(
    "TblCms",
    {
      no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      heading: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      subheading: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        tag: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        authordetails: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        schedule: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        active: {
          type: DataTypes.ENUM,
          values: ["0", "1"],
          defaultValue: "1"
        },
    },
    {
      tableName: "TblCms",
      indexes: [
        {
          fields: ["no"]
        }
      ]
    }
  );

  return TblCms;
};
