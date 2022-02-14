const { Teacher } = require("../../../db.js");

const deteteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findOne({
      //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //sacamos los atributos que nos interesan
    });
    if (!teacher) {
      return res.status(404).send({ message: "Profesor no encontrado" });
    }
    await Teacher.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "Profesor Eliminado", teacher }); //enviamos el profesor eliminado
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Error al eliminar el profesor" });
  }
};

module.exports = {
  deteteTeacher,
};
