const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review } = require("../db");

router.get("/prueba", async (req, res, next) => {
  res.status(200).send("Hola soy un GET");
});

router.post("/reviews", async (req, res, next) => {
  try {
  const { idCourse, idStudent, score } = req.body;
    const student = await Student.create({
      username,
      // name,
      lastname,
      email,
      password,
      avatar,
    });
    res.status(200).send(student);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/students", async (req, res, next) => {
  try {
  const { username, name, lastname, email, password, avatar } = req.body;
    const student = await Student.create({
      username,
      name,
      lastname,
      email,
      password,
      avatar,
    });
    res.status(200).send(student);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).send(students);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/courses", async (req, res, next) => {
  try {
  const { name, description, email } = req.body;
    const FK = await Teacher.findOne({
      where: {
        email: email,
      },
    });
    const courseCreated = await Course.create({
      name,
      description,
      FKteacherID: FK.id,
    });

    res.status(200).send(courseCreated);
  } catch (error) {
    console.error(error.message);
    res.status(404).send(error);
  }
});

router.get("/courses", async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/teachers", async (req, res, next) => {
  try {
  const { username, name, lastname, email, password, avatar } = req.body;
    const teacher = await Teacher.create({
      username,
      name,
      lastname,
      email,
      password,
      avatar,
    });
    res.status(200).send(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(404).send(error);
  }
});

router.get("/teachers", async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).send(teachers);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/videos", async (req, res, next) => {
  try {
  const { title, description, url, duration, name } = req.body;
    const FK = await Course.findOne({
      where: {
        name: name,
      },
    });
    const video = await Video.create({
      title,
      description,
      url,
      duration,
      FKcourseID: FK.id,
    });
    res.status(200).send(video);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/videos", async (req, res, next) => {
  try {
    const videos = await Video.findAll();
    res.status(200).send(videos);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/category", async (req, res, next) => {
  try {
  const { name } = req.body;
    const category = await Category.findOrCreate({
      where: {
        name,
      },
    });
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/category", async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.status(200).send(category);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/review", async(req, res, next) => {
  try {
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
    const review = await Review.create({
      score,
      FKstudentID: FKStudent.id,
      FKcourseID: FKCourse.id,
    });
    res.status(200).send(review);
  } catch (error) {
    res.status(404).send(error);
  }
})

module.exports = router;