const { Admin } = require("../../../db.js");

const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, avatar } = req.body;
  try {
    const admin = await Admin.findOne({
      //buscamos el adminstrador
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //sacamos solo los atributos a comparar
    });
    if (!admin) {
      return res.status(404).send({ message: "Administrador no encontrado" });
    }
    await Admin.update(
      //actualizamos el administrador, solo si el atributo que se quiere actualizar no esta vacio
      {
        name: name ? name : admin.name,
        lastName: lastName ? lastName : admin.lastName,
        email: email ? email : admin.email,
        avatar: avatar ? avatar : admin.avatar,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({ message: "Administrador Actualizado" });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Error al actualizar el administrador" });
  }
};

module.exports = {
  updateAdmin,
};
