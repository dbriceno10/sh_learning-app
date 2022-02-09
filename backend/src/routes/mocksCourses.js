const { Router } = require("express");
const router = Router();
const { courseMocks } = require("./mocks/mocksDataCourses.js");

router.get("/", (req, res) => {
  res.status(200).send(courseMocks);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const course = courseMocks.find((course) => course.id === parseInt(id));
  if (course) {
    res.status(200).send(course);
  } else {
    res.status(404).send({ message: "No existe el curso" });
  }
});

module.exports = router;
