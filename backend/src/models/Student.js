const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.UUID, //genera un identidicador numérico único
        defaultValue: DataTypes.UUIDV4, //genera un identificador único por defecto, un UUIDV4, la más estable
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false, //para hacer que sea obligatorio
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.TEXT,
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
