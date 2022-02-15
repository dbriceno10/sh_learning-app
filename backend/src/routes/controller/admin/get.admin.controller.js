const { Admin } = require("../../../db");

const getAdmins = async (req, res) => {
  try {
    let admins = await Admin.findAll({
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener los administradores" });
  }
};

const getAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    let admin = await Admin.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    if (!admin) {
      return res.status(404).send({ message: "Administrador no encontrado" });
    }
    res.status(200).json(admin);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener el adminstrador" });
  }
};

module.exports = {
  getAdmins,
  getAdmin,
};
