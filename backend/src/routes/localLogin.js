const { Router } = require("express");
const axios = require("axios");
const crypto = require("crypto");
const router = Router();
const { Student, Teacher } = require("../db");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user;
    let DB = await Student.findOne({ where: { email } });
    if (!DB) {
      DB = await Teacher.findOne({ where: { email } });
      if (!DB) return res.status(404).send("usuario invalido");
    }
    user= DB
    crypto.pbkdf2(
      password,
      user.salt,
      10000,
      64,
      "sha1",
      async (error, key) => {
        const encryptedPassword = key.toString("base64");
        if (user.password === encryptedPassword) {
          return res.status(200).send("usuario validado");
        }
        return res.status(404).send("usuario y/o contraseña incorrecta");
      }
    );
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = router;