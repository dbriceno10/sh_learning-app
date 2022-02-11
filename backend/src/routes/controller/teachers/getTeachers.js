const { Teacher } = require("../../../db.js");

const getTeachers = async (req, res) => {
  try {
    let teachers = await Teacher.findAll({
      attributes: ["id", "name", "lastName", "email", "avatar"], //solo vamos a enviar estos atributos al front
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
      attributes: ["id", "name", "lastName", "email", "avatar"], //solo vamos a enviar estos atributos al front
    });
    res.status(200).json(teacher);
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "Error al obtener el profesor" });
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, avatar } = req.body;
  try {
    const teacher = await Teacher.findOne({ //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"], //sacamos solo los atributos a comparar
    });
    await Teacher.update( //actualizamos el estudiante, solo si el atributo que se quiere actualizar no esta vacio
      {
        name: name ? name : teacher.name,
        lastName: lastName ? lastName : teacher.lastName,
        email: email ? email : teacher.email,
        avatar: avatar ? avatar : teacher.avatar,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({ message: "Profesor Actualizado" });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Error al actualizar el profesor" });
  }
};

const deteteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findOne({ //buscamos el estudiante
      where: {
        id: id,
      },
      attributes: ["name", "lastName", "email", "avatar"],//sacamos los atributos que nos interesan
    });
    if (!teacher) {
      return res.status(404).send({ message: "Profesor no encontrado" });
    }
    await Teacher.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "Profesor Eliminado", teacher }); //enviamos el profesor eliminado
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Error al eliminar el profesor" });
  }
};

module.exports = {
  getTeachers,
  getTeacher,
  updateTeacher,
  deteteTeacher,
};
