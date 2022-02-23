require("dotenv").config();
const {
  BYTES,
  BASE,
  ITERATIONS,
  LONG_ENCRYPTION,
  ENCRYPT_ALGORITHM,
  EMAIL_USER,
  PASSWORD_USER,
} = process.env;
const crypto = require("crypto");
const { Student, Teacher } = require("../../../db");

const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ where: { email } });
    // console.log("student: ", student)
    if (student) {
      // console.log("¿Entra a student?")
      crypto.randomBytes(parseInt(BYTES), (error, salt) => {
        const newSalt = salt.toString(BASE);
        crypto.pbkdf2(
          password,
          newSalt,
          parseInt(ITERATIONS),
          parseInt(LONG_ENCRYPTION),
          ENCRYPT_ALGORITHM,
          (error, key) => {
            const newPassword = key.toString(BASE);
            Student.update(
              {
                password: newPassword,
                salt: newSalt,
              },
              {
                where: {
                  email,
                },
              }
            );
          }
        );
        // console.log("¿Envía el mensaje de actualizar contraseña en student?")
      });
      return res.status(200).send({ message: "Contraseña actualizada" });
    } else {
      const teacher = await Teacher.findOne({ where: { email } });
      // console.log("teacher: ", teacher)
      if (teacher) {
        // console.log("¿Entra a teacher?")
        crypto.randomBytes(parseInt(BYTES), (error, salt) => {
          const newSalt = salt.toString(BASE);
          crypto.pbkdf2(
            password,
            newSalt,
            parseInt(ITERATIONS),
            parseInt(LONG_ENCRYPTION),
            ENCRYPT_ALGORITHM,
            (error, key) => {
              const newPassword = key.toString(BASE);
              Teacher.update(
                {
                  password: newPassword,
                  salt: newSalt,
                },
                {
                  where: {
                    email,
                  },
                }
              );
            }
          );
          // console.log("¿envía el mensaje de actualizar contraseña en teacher?")
        });
        return res.status(200).send({ message: "Contraseña actualizada" });
      }
    }
    // console.log("¿Envía el mensaje de correo inválido?")
    return res.status(404).send({ message: "Correo Inválido" });
  } catch (err) {
    console.log(err);
    // console.log("¿Envía mensaje de error al actualizar la contraseña?")
    res.status(404).send({ message: "Error al actualizar la contraseña" });
  }
};

module.exports = {
  updatePassword,
};
