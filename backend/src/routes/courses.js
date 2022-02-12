const { Router } = require("express");
const router = Router();
const {
  getCourses,
  getInfoCourse,
  getCourseDetail,
} = require("./controller/courses/courses.controller.js");
const { postCourses } = require("./controller/courses/post.courses.js");
const { deleteCourse } = require("./controller/courses/delete.course.js");
const { updateCourse } = require("./controller/courses/update.course.js");

router.post("/", postCourses); //create a course
router.get("/", getCourses); //trae todos los cursos,si tiene query filtra esos cursos
router.get("/:id", getCourseDetail); //trae todos los cursos,si tiene query filtra esos cursos
router.delete("/:id", deleteCourse);
router.put("/:id", updateCourse);

module.exports = router;
