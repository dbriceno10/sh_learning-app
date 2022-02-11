const { Student } = require("../../../db.js");

const getStudents = async (req, res) => {
  try {
    let students = await Student.findAll({
      attributes: ["id", "name", "lastName", "email", "avatar"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener los estudiantes" });
  }
};

const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    let student = await Student.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "lastName", "email", "avatar"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(student);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener el estudiante" });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, avatar } = req.body;
  try {
    const student = await Student.findOne({ //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //sacamos solo los atributos a comparar
    });
    await Student.update( //actualizamos el estudiante, solo si el atributo que se quiere actualizar no esta vacio
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

const deteteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({ //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //vamos a mandar solo los atributos que nos interesan
    });
    if (!student) {
      return res.status(404).send({ message: "Estudiante no encontrado" });
    }
    await Student.destroy({ //eliminamos el estudiante
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
  getStudents,
  getStudent,
  updateStudent,
  deteteStudent,
};
