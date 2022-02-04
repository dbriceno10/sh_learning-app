const { Router } = require('express');

const router = Router();

const {
    loginGoogle
} = require('../controllers/user.controller')



//// routes ////

router.post("/loginGoogle", loginGoogle);



module.exports = router;