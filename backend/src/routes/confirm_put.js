const express = require("express");
const router = express();
const { Student, Teacher } = require("../db");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
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
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

// router.put('/confirm', async (req, res) => {
//   const { email } = req.body;
//   try{
//     const verifyEmailStudent = await Student.findOne({ where: { email } });
//     if (verifyEmailStudent) {
//       await Student.update({
//         authorization: true
//       },
//         {
//           where: {
//             email
//           }
//         });
//         res.send('Authorization=true!');
//     }
//     const verifyEmailTeacher = await Teacher.findOne({ where: { email } });
//     if (verifyEmailTeacher) {
//       await Teacher.update({
//         authorization: true
//       },
//         {
//           where: {
//             email
//           }
//         });
//         res.send('Authorization=true!');
//     }
//     else{
//       res.send('Algo no funcionó bien');
//     }
//   }catch(error){
//     res.sendStatus(500).send('No pudo confirmarse');
//   }
// });

// router.post('/forgotpassword', async (req, res) => {

//   const {email, password} = req.body;
//   console.log(password, email);
//   try {
//     let verifyEmailStudent = await Student.findOne({ where: { email } });
//     if(!verifyEmailStudent){
//       return res.sendStatus(404).send('El correo no esta registrado');
//     }
//     if (verifyEmailStudent) {
//       crypto.randomBytes(parseInt(BYTES), (error, salt) => {
//         const newSalt = salt.toString(BASE);
//         crypto.pbkdf2(
//           password,
//           newSalt,
//           parseInt(ITERATIONS),
//           parseInt(LONG_ENCRYPTION),
//           ENCRYPT_ALGORITHM,
//           async (error, key) => {
//             const encryptedPassword = key.toString(BASE);
//             await Student.update({
//               password: encryptedPassword,
//               salt: newSalt
//             },
//               {
//                 where: {
//                   email
//                 }
//               });
//             res.send({message: "Contraseña cambiada"});
//           });
//       })
//     } else {
//       res.status(400).send("Email incorrecto")
//     }

//     let verifyEmailTeacher = await Teacher.findOne({ where: { email } });
//     if (verifyEmailTeacher) {
//       await Teacher.update({
//         password
//       },
//       {
//         where: {
//           email
//         }
//       });
//       res.send('Contraseña cambiada');
//     } else {
//       res.status(400).send("Email incorrecto")
//     }
//   }catch (error){
//     res.sendStatus(500).send(error);
//   }
// });

router.post("/register", async (req, res) => {
  let { name, lastName, email, password, salt } = req.body;
  try {
    const user = await Student.create({
      name,
      lastName,
      email,
      password,
      salt,
    });
    res.json(user);
  } catch (error) {
    res.send(`ERROR ${error}`);
  }
});
router.get("/student", async (req, res) => {
  try {
    let student = await Student.findAll();
    res.send(student);
  } catch (error) {
    res.sendStatus(500).send(error);
  }
});

module.exports = router;
