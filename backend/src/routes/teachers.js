const { Router } = require("express");
const router = Router();

const {
  getTeachers,
  getTeacher,
  updateTeacher,
  deteteTeacher,
} = require("./controller/teachers/getTeachers");

router.get("/", getTeachers);
router.get("/:id", getTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deteteTeacher);

module.exports = router;
