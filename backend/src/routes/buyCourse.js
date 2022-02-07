const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Course, Student } = require("../db");

router.post("/", async (req, res, next) => {
  const { nameCourse, emailStudent } = req.body;
  try {
    console.log("holi");
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
});

module.exports = router;
