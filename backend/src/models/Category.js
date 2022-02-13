const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "category",
    {
      // id: {
      //   type: DataTypes.UUID, //genera un identidicador numérico único
      //   defaultValue: DataTypes.UUIDV4, //genera un identificador único por defecto, un UUIDV4, la más estable
      //   primaryKey: true,
      //   allowNull: false,
      // },
      name: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: false,
      // createdAt: true,
      // updatedAt: true,
      freezeTableName: true,
    }
  );
};