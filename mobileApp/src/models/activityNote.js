module.exports = (sequelize, DataTypes) => {
  const TblActivityNote = sequelize.define(
    "TblActivityNote",
    {
      noteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      noteDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
    },

    {
      tableName: "TblActivityNote",
      indexes: [
        {
          fields: ["noteId"]
        }
      ]
    }

  );

  return TblActivityNote;
};