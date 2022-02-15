const { Student } = require("../../../db.js");

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, avatar } = req.body;
  try {
    const student = await Student.findOne({
      //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //sacamos solo los atributos a comparar
    });
    if (!student) {
      return res.status(404).send({ message: "Estudiante no encontrado" });
    }
    await Student.update(
      //actualizamos el estudiante, solo si el atributo que se quiere actualizar no esta vacio
      {
        name: name ? name : student.name,
        lastName: lastName ? lastName : student.lastName,
        email: email ? email : student.email,
        avatar: avatar ? avatar : student.avatar,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({ message: "Estudiante Actualizado" });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Error al actualizar el estudiante" });
  }
};

module.exports = {
  updateStudent,
};
