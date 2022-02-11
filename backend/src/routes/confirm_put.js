const express = require('express');
const router = express();
const { Student, Teacher } = require("../db");
const cors = require('cors');
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(cors());


router.put('/confirm', async (req, res) => {
  const email = req.query.email;  
  try{
    const verifyEmailStudent = await Student.findOne({ where: { email } }); 
    if (verifyEmailStudent) {
      await Student.update({
        authorization: true
      },
        {
          where: {
            email
          }
        });
        res.send('Authorization=true!');
    }
    const verifyEmailTeacher = await Teacher.findOne({ where: { email } }); 
    if (verifyEmailTeacher) {
      await Teacher.update({
        authorization: true
      },
        {
          where: {
            email
          }
        });
        res.send('Authorization=true!');
    }
    else{
      res.send('Algo no funcionó bien');
    }
  }catch(error){
    res.sendStatus(500).send('No pudo confirmarse');
  }
});

router.put('/forgotpassword', async (req, res) => {
  
  const {email, password} = req.body;
  try {
    let verifyEmailStudent = await Student.findOne({ where: { email } }); 
    if (verifyEmailStudent) {
      await Student.update({
        password
      },
      {
        where: {
          email
        }
      });
    }
    let verifyEmailTeacher = await Teacher.findOne({ where: { email } }); 
    if (verifyEmailTeacher) {
      await Teacher.update({
        password
      },
      {
        where: {
          email
        }
      });
    }
    else{
      res.send('Email incorrecto o inexistente.');
    }
  }catch (error){
    res.sendStatus(500).send(error);
  }
});

router.post('/register', async (req, res) => {
  
  let {name, lastName, email, password, salt, role} = req.body;
try{
  const user = await Student.create({
    name,
    lastName,
    email,
    password,
    salt,
    role
  });
  res.json(user);
}catch(error){
  res.send(`ERROR ${error}`);
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