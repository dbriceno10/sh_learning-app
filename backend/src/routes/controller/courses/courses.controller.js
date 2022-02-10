const { Category, Course, Review } = require("../../../db.js");

const { filterCategory } = require("../middleware");

const getCourses = async (req, res) => {
  const { name, category, order } = req.query;
  if (!name && !category && !order) {
    getAllCourses(req, res);
  } else {
    getCoursesByQuery(req, res, name, category, order);
  }
};

const getCourseDetail = async (req, res) => {
  const { name } = req.query;
  try {
    const detail = await getInfoCourse(name);
    if (!detail) {
      res.status(404).send({ message: "Curso no encontrado" });
    }
    res.json(detail);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getInfoCourse = async (name) => {
  try {
    let course = await Course.findOne({
      where: {
        name: name,
      },
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
    // console.log(course);
    let arrayCategories = [];
    //extract all categories names
    for (const category of course.categories) {
      arrayCategories.push(category.name);
    }
    // console.log('type of course.review in getinfo', typeof course.reviews);
    if (course.reviews.length !== 0) {
      let sumatoryReview = course.reviews.reduce(
        (prev, next) => parseInt(prev.score) + parseInt(next.score)
      );
      var meanReview = sumatoryReview / course.reviews.length;
    } else {
      var meanReview = 0;
    }

    let objectCourse = {
      id: course.id,
      name: course.name,
      description: course.description,
      price: course.price,
      img: course.img,
      teacherID: course.FKteacherID,
      category: arrayCategories,
      meanReview,
    };
    return objectCourse;
  } catch (err) {
    console.error(err);
    console.log("Error in getInfoCourse");
  }
};

const getAllCourses = async (req, res) => {
  try {
    let getAllCourses = await Course.findAll({
      attributes: ["name"],
    });
    let arrayAllCoursesInfo = [];
    // console.log(getAllCourses);
    for (const courseName of getAllCourses) {
      // console.log('courseName',courseName.dataValues.name);
      let temporaryInfo = await getInfoCourse(courseName.dataValues.name);
      arrayAllCoursesInfo.push(temporaryInfo);
    }
    res.json(arrayAllCoursesInfo);
    // getInfoCourse(name)
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

const getCoursesByQuery = async (req, res, name, category, order) => {
  //name, category, order
  let getAllCourses = await Course.findAll();
  /* let getAllCategories = await Category.findAll() */
  //Busca todos los cursos
  // console.log(getAllCourses)
  if (category) {
    filterCategory(category, getAllCourses); //Filtra por categoria
  }

  if (name) {
    getAllCourses.filter(
      (x) => x.name.toLowerCase().includes(name.toLowerCase()) //Filtra por nombre
    );
  }
  if (order === "maxP") {
    //Ordena por precio de mayor a menor
    getAllCourses = getAllCourses.sort(function (a, b) {
      if (a.price > b.price) return -1;
      if (b.price > a.price) return 1;
      return 0;
    });
  }
  if (order === "minP") {
    //Ordena por precio de menor a mayor
    getAllCourses = getAllCourses.sort(function (a, b) {
      if (a.price > b.price) return 1;
      if (b.price > a.price) return -1;
      return 0;
    });
  }
  if (order === "maxR") {
    //Ordena por review de mayor a menor
    getAllCourses = getAllCourses.sort(function (a, b) {
      if (a.rating > b.rating) return -1;
      if (b.rating > a.rating) return 1;
      return 0;
    });
  }
  if (order === "minR") {
    //Ordena por review de menor a mayor
    getAllCourses = getAllCourses.sort(function (a, b) {
      if (a.rating > b.rating) return 1;
      if (b.rating > a.rating) return -1;
      return 0;
    });
  }
  res.json(getAllCourses);
};

//!no encontre quien llama a este metodo
const getCourseById = async (id) => {
  try {
    const courseById = await Course.findByPk(id.toUpperCase());
    // console.log(courseById);
    return courseById;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  getInfoCourse,
  getCourseDetail,
};
