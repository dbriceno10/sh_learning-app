const { Router } = require("express");

const router = Router();

const {
  getStudents,
  getStudent,
  updateStudent,
  deteteStudent,
} = require("./controller/students/getStudents");

router.get("/", getStudents);
router.get("/:id", getStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deteteStudent);

module.exports = router;
