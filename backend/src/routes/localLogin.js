require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { BASE, ITERATIONS, LONG_ENCRYPTION, ENCRYPT_ALGORITHM } = process.env;
const crypto = require("crypto");
const router = Router();
const { Student, Teacher } = require("../db");

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let role;
    let DbUser = await Student.findOne({ where: { email } }); //buscamos el usuario en la tabla de estudiantes
    role = "alumno";
    if (!DbUser) {
      //si no existe el usuario en la base de datos
      DbUser = await Teacher.findOne({ where: { email } }); //buscamos el usuario en la tabla de profesores
      role = "profesor";
      if (!DbUser) return res.status(404).send("usuario invalido");
    }
    crypto.pbkdf2(
      //utilizamos la libreria crypto para encriptar la contraseña
      password, //contraseña a encriptar
      DbUser.salt, //salt guardado en base de datos
      parseInt(ITERATIONS), //iteraciones
      parseInt(LONG_ENCRYPTION), //longitud de la contraseña encriptada
      ENCRYPT_ALGORITHM, //algoritmo de encriptación
      async (error, key) => {
        const encryptedPassword = key.toString(BASE); //encriptamos la contraseña
        if (DbUser.password === encryptedPassword) {
          //comparamos la contraseña encriptada con la guardada en la base de datos
          return res
            .status(200)
            .send({ authorization: true, role: role, id: DbUser.id });
        }
        return res.status(404).send({ authorization: false });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = router;
