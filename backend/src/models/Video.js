const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "video",
    {
      id: {
        type: DataTypes.UUID, //genera un identidicador numérico único
        defaultValue: DataTypes.UUIDV4, //genera un identificador único por defecto, un UUIDV4, la más estable
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      duration: {
        type: DataTypes.FLOAT,//*Puede ser una duración en segundos...
      }
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
      freezeTableName: true,
    }
  );
};
