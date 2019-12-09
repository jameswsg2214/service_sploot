module.exports = (sequelize, DataTypes) => {
    const TblAppointment = sequelize.define(
      "TblAppointment",
      {
        allTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userId:{
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        petId: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        task_name: {
          type: DataTypes.STRING(250),
          allowNull: true
        },
        userName: {
          type: DataTypes.STRING(250),
          allowNull: true
        },
        start_date:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
          },
        end_date:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
          },
        repeat_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
         },
        frequency_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        every_frequency: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        selective_week: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cat_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
      },
      {
        tableName: "TblAppointment",
        indexes: [
          {
            fields: ["allTypeId"]
          }
        ]
      }
    );
  
    return TblAppointment;
  };
  