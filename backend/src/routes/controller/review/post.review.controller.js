const { Course, Student, Review } = require("../../../db.js");

const postReview = async (req, res) => {
  const { nameCourse, emailStudent, score } = req.body;
  try {
    const FKCourse = await Course.findOne({
      where: {
        name: nameCourse,
      },
    });
    if (!FKCourse) {
      return res.status(404).send({ message: "El curso no existe" });
    }
    const FKStudent = await Student.findOne({
      where: {
        email: emailStudent,
      },
    });
    if (!FKStudent) {
      return res.status(404).send({ message: "El estudiante no existe" });
    }
    const flag = await Review.findOne({
      where: {
        FKstudentID: FKStudent.id,
        FKcourseID: FKCourse.id,
      },
      attributes: ["flag"],
    });
    if (!flag) {
      try {
        const review = await Review.create({
          score,
          flag: true,
          FKstudentID: FKStudent.id,
          FKcourseID: FKCourse.id,
        });
        res.status(200).send(review);
      } catch (error) {
        res.status(404).send(error);
      }
    } else {
      res.status(404).send({ message: "Ya has calificado este curso" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  postReview,
};
