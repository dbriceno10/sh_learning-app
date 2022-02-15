const { Student, Teacher } = require("../../../db.js");
require("dotenv").config();
const { BYTES, BASE, ITERATIONS, LONG_ENCRYPTION, ENCRYPT_ALGORITHM, EMAIL_USER, PASSWORD_USER } =
  process.env;
const crypto = require("crypto");
const nodemailer = require('nodemailer');

const postUser = async (req, res) => {
  let { name, lastName, email, password, role, avatar } = req.body; //recibimos por body
  try {
    let user; //creamos una variable para guardar el usuario
    if (!avatar)
      //Asignamos avatar por defecto en caso de no venir
      avatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";
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
          //Verificamos si alguno e los email está ya en la base de datos
          const verifyEmailStudent = await Student.findOne({ where: { email } }); //buscamos el usuario en la tabla de estudiantes
            if (verifyEmailStudent) {
              return res
                .status(404)
                .send({ message: "El correo ya esta registrado" });
            }
            const verifyEmailTeacher = await Teacher.findOne({ where: { email } }); //buscamos el usuario en la tabla de profesores
            if (verifyEmailTeacher) {
              return res
                .status(404)
                .send({ message: "El correo ya esta registrado" });
            }
          const encryptedPassword = key.toString(BASE); //encriptamos la contraseña
          if (role === "alumno") {
            const student = await Student.create({
              name,
              lastName,
              email: email.trim().toLowerCase(),
              password: encryptedPassword,
              avatar,
              salt: newSalt,
              authorization: false,
              role: "alumno",
            });
            user = student; //guardamos el usuario en la variable
            let Transport = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: EMAIL_USER, // generated ethereal user
                pass: PASSWORD_USER, // generated ethereal password
              },
            }); 
            let info = await Transport.sendMail({
                from: '<confirmpassword@learnzilla.com>', // sender address
                to: email, // list of receivers
                 subject: "Confirmar cuenta", // Subject line
                html: `
                <h1>Hola ${name}</h1>
                <h2>Entra al siguiente link para confirmar tu cuenta <a href="https://learnzilla-app.vercel.app/confirmUser" target="_blank" rel="noreferrer">Confirmar mi cuenta</a></h2>
                `, 
              });
            Transport.sendMail(info, (error, response) => {
              if(error){
                res.send(error);
               }else{
                res.sendStatus(200).send('Email sent succesfully');
              }
            });
          
            Transport.close();
          } else {
            //si es profesor
            const teacher = await Teacher.create({
              name,
              lastName,
              email: email.trim().toLowerCase(),
              password: encryptedPassword,
              avatar,
              salt: newSalt,
              authorization: false,
              role: "profesor",
            });
            user = teacher; //guardamos el usuario en la variable
            let Transport =  nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: EMAIL_USER, // generated ethereal user
                pass: PASSWORD_USER, // generated ethereal password
              },
            }); 
            let info = await Transport.sendMail({
                from: '<confirmpassword@learnzilla.com>', // sender address
                to: email, // list of receivers
                 subject: "Confirmar cuenta", // Subject line
                html: `
                <h1>Hola ${name}</h1>
                <h2>Entra al siguiente link para confirmar tu cuenta <a href="https://learnzilla-app.vercel.app/confirmUser" target="_blank" rel="noreferrer">Confirmar mi cuenta</a></h2>
                `, 
              });
            Transport.sendMail(info, (error, response) => {
              if(error){
                res.send(error);
               }else{
                res.sendStatus(200).send('Email sent succesfully');
              }
            });
          
            Transport.close();
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
