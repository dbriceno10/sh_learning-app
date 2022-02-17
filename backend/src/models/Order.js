const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID, //genera un identidicador numérico único
        defaultValue: DataTypes.UUIDV4, //genera un identificador único por defecto, un UUIDV4, la más estable
        primaryKey: true,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      arrayCoursesId: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      // freezeTableName: true,
    }
  );
};
