const { Student, Course } = require("../../../db.js");
const { getInfoStudent } = require("./getInfoStudent.js");
const { getAllStudents } = require("./getAllStudents.js");

const getStudents = async (req, res) => {
  try {
    // let students = await getAllStudents();
    const students = await Student.findAll({});
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener los estudiantes" });
  }
};

const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    let student = await getInfoStudent(id);
    if (!student) {
      return res.status(404).send({ message: "Estudiante no encontrado" });
    }
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
