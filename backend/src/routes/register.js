require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { BYTES, BASE, ITERATIONS, LONG_ENCRYPTION, ENCRYPT_ALGORITHM } = process.env;
const crypto = require("crypto");
const router = Router();
const { Student, Teacher } = require("../db");

router.post("/", async (req, res, next) => {
  let { name, lastName, email, password, role, avatar } = req.body; //recibimos por body
  console.log(req.body);
  try {
    let user; //creamos una variable para guardar el usuario
    if (!avatar)
      //Asignamos avatar por defecto en caso de no venir
      avatar =
        "../assets/defaultUser.png";
    //vamos a utilizar la libería cryto de node para encriptar la contraseña
    crypto.randomBytes(parseInt(BYTES), (error, salt) => {
      //recibimos una base numérica en bytes una función callback
      //salt ===> es un string generado aleatoriamente que utilizamos para encriptar la contraseña, se guarda en base de datos
      const newSalt = salt.toString(BASE); //generamos un nuevo salt
      crypto.pbkdf2(
        password,
        newSalt,
        parseInt(ITERATIONS), //iteraciones para encriptar
        parseInt(LONG_ENCRYPTION), //longitud de la contraseña encriptada
        ENCRYPT_ALGORITHM, //algoritmo de encriptación
        async (error, key) => {
          //nuevamente pasamos una función de callback
          const encryptedPassword = key.toString(BASE); //encriptamos la contraseña
          if (role === "alumno") {
            const student = await Student.create({
              name,
              lastName,
              email,
              password: encryptedPassword,
              avatar,
              salt: newSalt,
            });
            user = student; //guardamos el usuario en la variable
          } else { //si es profesor
            const teacher = await Teacher.create({
              name,
              lastName,
              email,
              password: encryptedPassword,
              avatar,
              salt: newSalt,
            });
            user = teacher; //guardamos el usuario en la variable
          }
          res.status(200).send("Usuario Registrado con Éxito");
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = router;
