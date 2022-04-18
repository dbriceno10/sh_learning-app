const { Router } = require("express");

const router = Router();

const {
  getStudents,
  getStudent,
} = require("./controller/students/get.students.controller");
const {
  updateStudent,
} = require("./controller/students/update.student.controller");
const {
  deteteStudent,
} = require("./controller/students/delete.student.controller");

router.get("/", getStudents);
router.get("/detail/:id", getStudent);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deteteStudent);

module.exports = router;
