const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "review",
    {
      id: {
        type: DataTypes.UUID, //genera un identidicador numérico único
        defaultValue: DataTypes.UUIDV4, //genera un identificador único por defecto, un UUIDV4, la más estable
        primaryKey: true,
        allowNull: false,
      },
      score: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        // type: DataTypes.INTEGER,
        // defaultValue: "0",
        allowNull: false,
      },
      flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
      freezeTableName: true,
    }
  );
};
