
const { Router } = require("express");

// Importar todos los routers;
const tests = require("./testRoutes/tests.js");
const register = require("./register.js");
// const nodemailer = require("./testRoutes/nodemailer.js");
const fakeCourses = require("./mocksCourses.js")
const courses = require("./courses.js");

const router = Router();

const user = require('./user.routes')

// Configurar los routers

router.use("/tests", tests);
router.use("/register", register);
// router.use("/nodemailer", nodemailer);
router.use("/fakecourses", fakeCourses);
router.use("/courses", courses);





/////////////////USER////////////////
router.use("/user", user)

module.exports = router;

