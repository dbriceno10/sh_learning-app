
const { Course,Student} = require("../../../db.js");

const postBuyCourse = async (req, res, next) => {
    const { nameCourse, emailStudent } = req.body;
    try {
      const course = await Course.findOne({
        where: {
          name: nameCourse,
        },
      });
      const student = await Student.findOne({
        where: {
          email: emailStudent,
        },
        // attributes: ["id"],
      });
      student.addCourse(course.id);
      res.status(200).send("Curso comprado");
    } catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
  };


module.exports = {
  postBuyCourse,
}