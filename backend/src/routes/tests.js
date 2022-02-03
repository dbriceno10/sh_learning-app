const { Router } = require("express");
const axios = require("axios");
// const { Type } = require('../db'); //me raigo mis
const router = Router();
const { Category, Course, Student, Teacher, Video } = require("../db");

router.get("/prueba", async (req, res, next) => {
  res.status(200).send("Hola soy un GET");
});

router.post("/students", async (req, res, next) => {
  const { username, name, lastname, email, password, avatar } = req.body;
  try {
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
  const { title, description, image, teacherId } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      image,
      teacherId: "ef8ab179-9ad5-4fed-9e3f-8d6a91f51ecb",
    });
    res.status(200).send(course);
  } catch (error) {
    res.status(404).send(error);
  }
});

// router.post("/courses", async (req, res, next) => {
//   const { name, description } = req.body;
//   try {
//     const course = await Course.create({
//       name,
//       description,
//     });
//     res.status(200).send(course);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

router.get("/courses", async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/teachers", async (req, res, next) => {
  const { username, name, lastname, email, password, avatar } = req.body;
  try {
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
  const { title, description, url, courseId } = req.body;
  try {
    const video = await Video.create({
      title,
      description,
      url,
      courseId,
    });
    res.status(200).send(video);
  } catch (error) {
    res.status(404).send(error);
  }
});

// router.post("/videos", async (req, res, next) => {
//   const { title, description, url, duration } = req.body;
//   try {
//     const video = await Video.create({
//       title,
//       description,
//       url,
//       duration,
//     });
//     res.status(200).send(video);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

router.get("/videos", async (req, res, next) => {
  try {
    const videos = await Video.findAll();
    res.status(200).send(videos);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
