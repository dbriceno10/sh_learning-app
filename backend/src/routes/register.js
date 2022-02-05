const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review } = require("../db");

router.post("/", async (req, res, next) => {
  let { name, lastName, email, password, role, avatar } = req.body;
  try {
    let user;
    if (!avatar)
      avatar = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png";

    if (role === "alumno") {
      const student = await Student.create({
        name,
        lastName,
        email,
        password,
        avatar,
      });
      user = student;
    } else {
      const teacher = await Teacher.create({
        name,
        lastName,
        email,
        password,
        avatar,
      });
      user = teacher;
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = router;
