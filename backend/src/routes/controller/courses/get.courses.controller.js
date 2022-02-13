const { Category, Course, Review } = require("../../../db.js");

const { filterCategory } = require("../middleware");
const { getCoursesByQuery } = require("./getCoursesByQuery");
const { getAllDataCourses } = require("./getAllDataCourses");
const { getInfoCourse } = require("./getInfoCourse");

const getAllCourses = async (req, res) => {
  try {
    let getAllCourses = await getAllDataCourses(); //Busca todos los cursos
    // console.log("GET ALL COURSES", getAllCourses)
    res.json(getAllCourses); //Envía el array con todos los cursos
    // getInfoCourse(name)
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

const getCourses = async (req, res) => {
  const { category, order } = req.query;
  if (category === undefined && order === undefined) {
    getAllCourses(req, res);
  } else {
    getCoursesByQuery(req, res, category, order);
  }
};

const getCourseDetail = async (req, res) => {
  //Obtiene el detalle de un curso
  const { id } = req.params;
  try {
    let name;
    try {
      name = await Course.findOne({
        //Busca el curso por id
        where: {
          id: id,
        },
      });
    } catch (error) {
      return res.status(404).send({ message: "Curso no encontrado" }); //Si no encuentra el curso, retorna un error
    }
    const detail = await getInfoCourse(name.name); //Obtiene el detalle del curso
    if (!detail) {
      return res.status(404).send({ message: "Curso no encontrado" }); //Si no encuentra el curso, retorna un error
    }
    res.json(detail); //Envía el detalle del curso
  } catch (error) {
    res.status(404).send(error);
  }
};

//!no encontre quien llama a este metodo
// const getCourseById = async (id) => {
//   try {
//     const courseById = await Course.findByPk(id.toUpperCase());
//     // console.log(courseById);
//     return courseById;
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  getCourses,
  getCourseDetail,
};
