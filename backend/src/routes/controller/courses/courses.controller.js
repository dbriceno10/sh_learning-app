const { Category, Course, Review } = require("../../../db.js");

const { filterCategory } = require("../middleware");

const getAllCourses = async (req, res) => {
  try {
    let courses = await Course.findAll({ //Busca toddos los cursos
      include: [
        {
          model: Category, //Incluye las categorias
          attributes: ["name"], //trae la data mediante el nombre(la propiedad del modelo type)
          // exclude: ["description"],
          thorugh: {
            attributes: [], //para comprobación, siempre va
          },
        },
        {
          model: Review, //Incluye las reviews
          attributes: ["score"],
          thorugh: {
            attributes: [],
          },
        },
      ],
      attributes: ["id", "name", "description", "price", "img", "FKteacherID"], //Envía solo estos atributos
    });
    res.status(200).send(courses);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

const getCoursesByQuery = async (req, res, name, category, order) => { //name, category, order
  let getAllCourses = await Course.findAll(); //Busca todos los cursos
  // console.log(getAllCourses)
  if (category) {
    filterCategory(category, getAllCourses); //Filtra por categoria
  }

  if (name) {
    getAllCourses.filter((x) =>
      x.name.toLowerCase().includes(name.toLowerCase()) //Filtra por nombre
    );
  }
  if (order === "maxP") { //Ordena por precio de mayor a menor
    getAllCourses = getAllCourses.sort(function (a, b) {
      if (a.price > b.price) return -1;
      if (b.price > a.price) return 1;
      return 0;
    });
  }
  if (order === "minP") { //Ordena por precio de menor a mayor
    getAllCourses = getAllCourses.sort(function (a, b) {
      if (a.price > b.price) return 1;
      if (b.price > a.price) return -1;
      return 0;
    });
  }
  if (order === "maxR") { //Ordena por review de mayor a menor
    getAllCourses = getAllCourses.sort(function (a, b) {
      if (a.rating > b.rating) return -1;
      if (b.rating > a.rating) return 1;
      return 0;
    });
  }
  if (order === "minR") { //Ordena por review de menor a mayor
    getAllCourses = getAllCourses.sort(function (a, b) {
      if (a.rating > b.rating) return 1;
      if (b.rating > a.rating) return -1;
      return 0;
    });
  }
  res.json(getAllCourses);
};

const getCourses = async (req, res) => {
  const { name, category, order } = req.query;
  if (!name && !category && !order) {
    getAllCourses(req, res);
  } else {
    getCoursesByQuery(req, res, name, category, order);
  }
};

//!no encontre quien llama a este metodo
const getCourseById = async (id) => {
  try {
    const courseById = await Course.findByPk(id.toUpperCase());
    console.log(courseById);
    return courseById;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
};
