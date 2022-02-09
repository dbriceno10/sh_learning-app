const { Router } = require("express");
const router = Router();
const {getCourses} = require('./controller/courses/courses.controller.js')
const {postCourses} = require('./controller/courses/post.courses.js')


router.post("/", postCourses);//create a course
router.get('/', getCourses); //trae todos los cursos,si tiene query filtra esos cursos

module.exports = router;
