const { Router } = require("express");

const router = Router();

const { loginGoogle } = require("./controller/user.controller");

//// routes ////

router.post("/loginGoogle", loginGoogle);

module.exports = router;
