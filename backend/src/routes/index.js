const { Router } = require("express");

// Importar todos los routers;
const tests = require("./testRoutes/tests.js");
const register = require("./register.js");
const fakeCourses = require("./mocksCourses.js");
const courses = require("./courses.js");
const category = require("./category.js");
const review = require("./review.js");
const video = require("./video.js");
const buyCourse = require("./buyCourse.js");

const router = Router();

const user = require("./user.routes");

// Configurar los routers

router.use("/tests", tests);
router.use("/register", register);
router.use("/fakecourses", fakeCourses);
router.use("/courses", courses);
router.use("/category", category);
router.use("/review", review);
router.use("/video", video);
router.use("/buy", buyCourse);

/////////////////USER////////////////
router.use("/user", user);

module.exports = router;
