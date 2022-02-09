const { Router } = require("express");
const router = Router();

const {getTeachers} = require('./controller/teachers/getTeachers')

router.get('/', getTeachers); 

module.exports = router;