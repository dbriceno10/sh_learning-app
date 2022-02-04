
const { Router } = require("express");

// Importar todos los routers;
const tests = require("./tests.js");
const register = require("./register.js");
// const nodemailer = require("./nodemailer.js");

const router = Router();

const user = require('./user.routes')

// Configurar los routers

router.use("/tests", tests);
router.use("/register", register);
// router.use("/nodemailer", nodemailer);



/////////////////USER////////////////
router.use("/user", user)

module.exports = router;

