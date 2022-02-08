const { Router } = require("express");
const router = Router();
const {getCourses} = require('./controller/courses.controller')
const {postCourses} = require('./controller/post.courses')


router.post("/", postCourses);//create a course
router.get('/', getCourses); //trae todos los cursos,si tiene query filtra esos cursos

module.exports = router;
