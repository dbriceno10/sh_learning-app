
const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const pokemons = require('./pokemons.js');
// const types = require('./types.js');
const tests = require("./tests.js");
const register = require("./register.js");
const user = require('./user.routes');
const nodemailer = require('./nodemailer');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/pokemons', pokemons);
// router.use('/types', types);
router.use("/tests", tests);
router.use("/register", register);
router.use('/nodemailer', nodemailer);



/////////////////USER////////////////
router.use("/user", user)

module.exports = router;

