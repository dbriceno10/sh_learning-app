const { Course,Student,Review } = require("../../../db.js");

const postReview = async (req,res) => {

    const { nameCourse, emailStudent, score } = req.body;
    const FKCourse = await Course.findOne({
      where: {
        name: nameCourse,
      },
    });
    const FKStudent = await Student.findOne({
      where: {
        email: emailStudent,
      },
    });
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
      res.status(404).send("Ya has calificado este curso");
    }
}

module.exports={
    postReview,
}