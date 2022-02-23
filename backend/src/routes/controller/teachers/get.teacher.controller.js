const { Teacher } = require("../../../db.js");

const getTeachers = async (req, res) => {
  try {
    let teachers = await Teacher.findAll({
      // attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(teachers);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener los profesores" });
  }
};

const getTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    let teacher = await Teacher.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "lastName", "email", "avatar", "role"], //solo vamos a enviar estos atributos al front
    });
    if (!teacher) {
      return res.status(404).send({ message: "Profesor no encontrado" });
    }
    res.status(200).json(teacher);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener el profesor" });
  }
};

module.exports = {
  getTeachers,
  getTeacher,
};
