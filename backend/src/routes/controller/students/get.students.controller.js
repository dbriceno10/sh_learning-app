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

module.exports = {
  getStudents,
  getStudent,
};
