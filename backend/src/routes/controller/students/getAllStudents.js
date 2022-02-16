const { Student } = require("../../../db");
const { getInfoStudent } = require("./getInfoStudent.js");

const getAllStudents = async () => {
  try {
    let students = await Student.findAll({
      attributes: ["id"],
    });
    let arrayStudents = [];
    for (const student of students) {
      let temporaryInfo = await getInfoStudent(student.id);
      arrayStudents.push(temporaryInfo);
    }
    return arrayStudents;
  } catch (error) {
    console.log("Error al obtener los estudiantes");
    console.log(error);
  }
};

module.exports = {
  getAllStudents,
};
