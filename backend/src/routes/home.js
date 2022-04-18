const { Router } = require("express");
const router = Router();
const { getLastFiveCourses } = require("./controller/home/getHome");

router.get("/", getLastFiveCourses);

module.exports = router;
