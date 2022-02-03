const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "course",
    {
      id: {
        type: DataTypes.UUID, //genera un identidicador numérico único
        defaultValue: DataTypes.UUIDV4, //genera un identificador único por defecto, un UUIDV4, la más estable
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      // id_student: {
      //   type: DataTypes.STRING,
      //   unique: true,
      // },
      // id_teacher: {
      //   type: DataTypes.STRING,
      //   unique: true,
      // },
      // id_category: {
      //   type: DataTypes.STRING,
      //   unique: true,
      // }
      //Rating?
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
      freezeTableName: true,
    }
  );
};
