const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const pokemons = require('./pokemons.js');
// const types = require('./types.js');

const router = Router();

const user = require('./user.routes')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/pokemons', pokemons);
// router.use('/types', types);


/////////////////USER////////////////
router.use("/user", user)

module.exports = router;