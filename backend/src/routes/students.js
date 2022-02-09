const { Router } = require("express");

const router = Router();

const {getStudents} = require('./controller/students/getStudents')

router.get('/', getStudents); 

module.exports = router;