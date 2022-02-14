const { Student } = require("../../../db.js");

const getStudents = async (req, res) => {
  try {
    let students = await Student.findAll({
      // attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
      attributes: ["id", "name", "lastName", "email", "avatar"],
    });
    // res.status(200).json(students);
    res.status(200).send({id: student.id, name: student.name, lastName: student.lastName, email: student.email, avatar: student.avatar, role: "alumno"})
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
      // attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
      attributes: ["id", "name", "lastName", "email", "avatar"],
    });
    // res.status(200).json(student);
    res.status(200).send({id: student.id, name: student.name, lastName: student.lastName, email: student.email, avatar: student.avatar, role: "alumno"})
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener el estudiante" });
  }
};

module.exports = {
  getStudents,
  getStudent,
};
