const { Cv, Teacher } = require("../../../db");

const postCv = async (req, res) => {
  const { teacherId, urlCv } = req.body;
  try {
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).send({ message: "El profesor es inválido" });
    }
    const cv = await Cv.create({
      teacherId,
      url: urlCv,
    });
    res.send({ message: "El cv se ha creado correctamente", cvId: cv.id });
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  postCv,
};
