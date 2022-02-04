const { Router } = require("express");
// Importar todos los routers;
const tests = require("./tests.js");
const register = require("./register.js");
// const nodemailer = require("./nodemailer.js");

const router = Router();

// Configurar los routers

router.use("/tests", tests);
router.use("/register", register);
// router.use("/nodemailer", nodemailer);

module.exports = router;
