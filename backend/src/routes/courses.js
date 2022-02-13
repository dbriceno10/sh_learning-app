const { Router } = require("express");
const router = Router();
const { getCourses, getCourseDetail } = require("./controller/courses/get.courses.controller.js");
const { postCourses } = require("./controller/courses/post.courses.controller.js");
const { deleteCourse } = require("./controller/courses/delete.course.controller.js");
const { updateCourse } = require("./controller/courses/update.course.controller.js");

router.post("/create", postCourses); //create a course
router.get("/", getCourses); //trae todos los cursos,si tiene query filtra esos cursos
router.get("/detail/:id", getCourseDetail); //trae todos los cursos,si tiene query filtra esos cursos
router.delete("/delete/:id", deleteCourse);
router.put("/update/:id", updateCourse);

module.exports = router;
