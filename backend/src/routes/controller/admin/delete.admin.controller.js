const { Admin } = require("../../../db.js");

const deteteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findOne({
      //buscamos el administrador
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //vamos a mandar solo los atributos que nos interesan
    });
    if (!admin) {
      return res.status(404).send({ message: "Administrador no encontrado" });
    }
    await Admin.destroy({
      //eliminamos el administrador
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "Administrador Eliminado", admin }); //enviamos el estudiante eliminado
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Error al eliminar el administrador" });
  }
};

module.exports = {
  deteteAdmin,
};
