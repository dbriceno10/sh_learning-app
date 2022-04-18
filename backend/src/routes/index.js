const { Router } = require("express");
// Importar todos los routers;
const register = require("./register.js");
const user = require("./user.routes");
const confirmput = require("./confirm_put.js");

const router = Router();

const login = require("./localLogin.js");
const fakeCourses = require("./mocksCourses.js");
const courses = require("./courses.js");
const category = require("./category.js");
const review = require("./review.js");
const video = require("./video.js");
const home = require("./home.js");
const admins = require("./admins.js");
const students = require("./students.js");
const teachers = require("./teachers.js");
const stripe = require("./stripe.js");
const dataMaker = require("./dataMaker.js");
const cv = require("./cv.js");
const updatePassword = require("./updatePassword.js");

// Configurar los routers
router.use("/confirmput", confirmput);
router.use("/fakecourses", fakeCourses);
router.use("/category", category);
router.use("/courses", courses);
router.use("/home", home); //In this route the front will send the id of the student and the back will give back the last five videos the user has watched
router.use("/login", login);
router.use("/register", register);
router.use("/review", review);
router.use("/admins", admins);
router.use("/students", students);
router.use("/teachers", teachers);
router.use("/video", video);
router.use("/stripe", stripe);
router.use("/cv", cv);
router.use("/password", updatePassword);
router.use("/datamaker", dataMaker); // ----> esta ruta es solo para cargar info en base de datos si hace falta

/////////////////USER////////////////
router.use("/user", user);

module.exports = router;
