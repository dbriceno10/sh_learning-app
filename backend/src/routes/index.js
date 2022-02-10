const { Router } = require("express");
// Importar todos los routers;
const register = require("./register.js");
const user = require('./user.routes');
const nodemailer = require('./nodemailer');

const router = Router();

const login = require("./localLogin.js");
const fakeCourses = require("./mocksCourses.js");
const courses = require("./courses.js");
const category = require("./category.js");
const review = require("./review.js");
const video = require("./video.js");
const buyCourse = require("./buyCourse.js");
const home = require("./home.js");
const students = require("./students.js");
const teachers = require("./teachers.js");


// Configurar los routers
router.use('/nodemailer', nodemailer);
router.use("/buy", buyCourse);
router.use("/fakecourses", fakeCourses);
router.use("/category", category);
router.use("/courses", courses);
router.use("/home", home);//In this route the front will send the id of the student and the back will give back the last five videos the user has watched
router.use("/login", login);
router.use("/register", register);
router.use("/review", review);
router.use("/students", students);
router.use("/teachers", teachers);
router.use("/video", video);


/////////////////USER////////////////
router.use("/user", user);



module.exports = router;
