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
    let user; //creamos una variable para guardar el usuario
    let DbUser = await Student.findOne({ where: { email } }); //buscamos el usuario en la tabla de estudiantes
    if (!DbUser) {//si no existe el usuario en la base de datos
      DbUser = await Teacher.findOne({ where: { email } });//buscamos el usuario en la tabla de profesores
      if (!DbUser) return res.status(404).send("usuario invalido");
    }
    user = DbUser;//guardamos el usuario en la variable
    crypto.pbkdf2(//utilizamos la libreria crypto para encriptar la contraseña
      password,//contraseña a encriptar
      user.salt,//salt guardado en base de datos
      parseInt(ITERATIONS),//iteraciones
      parseInt(LONG_ENCRYPTION),//longitud de la contraseña encriptada
      ENCRYPT_ALGORITHM,//algoritmo de encriptación
      async (error, key) => {
        const encryptedPassword = key.toString(BASE);//encriptamos la contraseña
        if (user.password === encryptedPassword) {//comparamos la contraseña encriptada con la guardada en la base de datos
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
