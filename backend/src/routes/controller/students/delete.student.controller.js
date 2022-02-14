const { Student } = require("../../../db.js");

const deteteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({
      //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //vamos a mandar solo los atributos que nos interesan
    });
    if (!student) {
      return res.status(404).send({ message: "Estudiante no encontrado" });
    }
    await Student.destroy({
      //eliminamos el estudiante
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "Estudiante Eliminado", student }); //enviamos el estudiante eliminado
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Error al eliminar el estudiante" });
  }
};

module.exports = {
  deteteStudent,
};
