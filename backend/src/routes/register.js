const { Router } = require("express");
const axios = require("axios");
const crypto = require("crypto");
const router = Router();
const { Student, Teacher } = require("../db");

router.post("/", async (req, res, next) => {
  let { name, lastName, email, password, role, avatar } = req.body;
  try {
    let user;
    if (!avatar)
      avatar =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png";
    crypto.randomBytes(16, (error, salt) => {
      const newSalt = salt.toString("base64");
      crypto.pbkdf2(
        password,
        newSalt,
        10000,
        64,
        "sha1",
        async (error, key) => {
          const encryptedPassword = key.toString("base64");
          if (role === "alumno") {
            const student = await Student.create({
              name,
              lastName,
              email,
              password: encryptedPassword,
              avatar,
              salt: newSalt,
            });
            user = student;
          } else {
            const teacher = await Teacher.create({
              name,
              lastName,
              email,
              password: encryptedPassword,
              avatar,
              salt: newSalt,
            });
            user = teacher;
          }
          res.status(200).send(user);
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = router;
