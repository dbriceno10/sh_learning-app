const { Student, Teacher } = require("../../../db.js");
require("dotenv").config();
const { BYTES, BASE, ITERATIONS, LONG_ENCRYPTION, ENCRYPT_ALGORITHM } =
  process.env;
const crypto = require("crypto");

const postUser = async (req, res) => {
  let { name, lastName, email, password, role, avatar } = req.body; //recibimos por body
  try {
    let user; //creamos una variable para guardar el usuario
    if (!avatar)
      //Asignamos avatar por defecto en caso de no venir
      avatar =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png";
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
            const verifyEmail = await Student.findOne({ where: { email } }); //buscamos el usuario en la tabla de estudiantes
            if (verifyEmail) {
              return res
                .status(404)
                .send({ message: "El correo ya esta registrado" });
            }
            const student = await Student.create({
              name,
              lastName,
              email,
              password: encryptedPassword,
              avatar,
              salt: newSalt,
              authorization: false,
            });
            user = student; //guardamos el usuario en la variable
          } else {
            //si es profesor
            const verifyEmail = await Teacher.findOne({ where: { email } }); //buscamos el usuario en la tabla de profesores
            if (verifyEmail) {
              return res
                .status(404)
                .send({ message: "El correo ya esta registrado" });
            }
            const teacher = await Teacher.create({
              name,
              lastName,
              email,
              password: encryptedPassword,
              avatar,
              salt: newSalt,
              authorization: false,
            });
            user = teacher; //guardamos el usuario en la variable
          }
          res.status(200).send({ message: "Usuario Registrado con Éxito" });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

module.exports = {
  postUser,
};
