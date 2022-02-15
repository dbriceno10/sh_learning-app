const { Course } = require("../../../db.js");

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await Course.findOne({
      where: {
        id: id,
      },
      attributes: ["name", "description", "price", "img", "FKteacherID"],
    });
    if (!course) {
      return res.status(404).send({ message: "Curso no encontrado" });
    }
    await Course.destroy({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .send({ message: "Curso eliminado con Éxito", course: course });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  deleteCourse,
};
