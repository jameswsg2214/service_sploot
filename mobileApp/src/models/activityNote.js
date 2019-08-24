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
        notes: {
          type: DataTypes.STRING,
          allowNull: false        
        }
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