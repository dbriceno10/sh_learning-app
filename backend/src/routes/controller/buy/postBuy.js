
const { Course,Student} = require("../../../db.js");

const postBuyCourse = async (req, res, next) => {
    const { nameCourse, emailStudent } = req.body; //nameCourse es el nombre del curso, emailStudent es el email del estudiante
    try {
      const course = await Course.findOne({ //Busca el curso
        where: {
          name: nameCourse,
        },
      });
      const student = await Student.findOne({ //Busca el estudiante
        where: {
          email: emailStudent,
        },
        // attributes: ["id"],
      });
      student.addCourse(course.id); //Agrega el curso al estudiante
      res.status(200).send("Curso comprado");
    } catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
  };


module.exports = {
  postBuyCourse,
}