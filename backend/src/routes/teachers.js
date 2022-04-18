const { Router } = require("express");
const router = Router();

const {
  getTeachers,
  getTeacher,
} = require("./controller/teachers/get.teacher.controller");
const {
  updateTeacher,
} = require("./controller/teachers/update.teacher.controller");
const {
  deteteTeacher,
} = require("./controller/teachers/delete.teacher.controller");

router.get("/", getTeachers);
router.get("/detail/:id", getTeacher);
router.put("/update/:id", updateTeacher);
router.delete("/delete/:id", deteteTeacher);

module.exports = router;
