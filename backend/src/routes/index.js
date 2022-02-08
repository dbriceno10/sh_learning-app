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
const admin = require('./admin.js')


// Configurar los routers
router.use("/register", register);
router.use('/nodemailer', nodemailer);
router.use("/fakecourses", fakeCourses);
router.use("/courses", courses);
router.use("/category", category);
router.use("/review", review);
router.use("/video", video);
router.use("/buy", buyCourse);

//In this route the front will send the id of the student and the back will give back the last five videos the user has watched
router.use("/home", home);


router.use("/login", login);


/////////////////USER////////////////
router.use("/user", user);


//////////ADMIN///////77
router.use("/admin", admin);

module.exports = router;
