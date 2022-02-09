const express = require('express');
const router = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const { Student, Teacher } = require("../db");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(cors());

router.post('/register', async (req, res) => {
  
  let {name, lastName, email, password, salt} = req.body;
try{
  const user = await Student.create({
    name,
    lastName,
    email,
    password,
    salt
  });
  res.json(user);

  let Transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'davidpatejo@gmail.com', // generated ethereal user
      pass: 'gtnhexomenxgaujz', // generated ethereal password
    },
  }); 
  let info = await Transport.sendMail({
      from: '<confirmpassword@learnzilla.com>', // sender address
      to: email, // list of receivers
       subject: "Confirmar cuenta", // Subject line
      html: `
      <h1>Hola ${name}</h1>
      <h2>Entra al link para confirmar tu cuenta http://localhost:3001/nodemailer/confirm?email=${email}</h2>
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
}catch(error){
  res.send(`ERROR ${error}`);
}
});

router.put('/confirm', async (req, res) => {
  const email = req.query.email;  
  try{
      await Student.update({
      authorization: true
    },
      {
        where: {
          email
        }
      });
    res.send('Authorization = true!');
  }catch(error){
    res.sendStatus(500).send('No se pudo rey');
  }
});

router.put('/forgotpassword', async (req, res) => {
  const email = req.query.email;
  const {password} = req.body;
  try {
    await Student.update({
      password
    },
    {
      where: {
        email
      }
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500).send(error);
  }
});

router.get('/student', async (req, res) => {
  try {
    let student = await Student.findAll();
    res.send(student);
  } catch (error) {
    res.sendStatus(500).send(error);
  }
});


module.exports = router;