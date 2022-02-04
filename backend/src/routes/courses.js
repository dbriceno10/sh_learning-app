const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review } = require("../db");

router.post("/", async (req, res, next) => {
  const { name, description, email, img, price, category } = req.body;
  try {
    const FK = await Teacher.findOne({
      where: {
        email: email,
      },
    });
    const courseCreated = await Course.create({
      name,
      description,
      price,
      img,
      FKteacherID: FK.id,
    });
    res.status(200).send(courseCreated);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
