const { Router } = require("express");
const router = Router();
const {postUser} = require('./controller/register/postUser')

router.post("/", postUser) 

module.exports = router;