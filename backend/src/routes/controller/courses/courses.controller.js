const { Category, Course, Review } = require("../../../db.js");

const { filterCategory } = require("../middleware");

const getAllDataCourses = async () => {
  try {
    let getAllCourses = await Course.findAll({ //Busca todos los cursos
      attributes: ["name"],
    });
    let arrayAllCoursesInfo = []; //Array que contendrá todos los cursos
    // console.log(getAllCourses);
    for (const courseName of getAllCourses) { //Recorre todos los cursos
      // console.log('courseName',courseName.dataValues.name);
      let temporaryInfo = await getInfoCourse(courseName.dataValues.name); //Obtiene la información del curso
      arrayAllCoursesInfo.push(temporaryInfo); //Agrega la información del curso al array
    }
    console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII", arrayAllCoursesInfo)//Envía el array con todos los cursos
    return arrayAllCoursesInfo;
    // getInfoCourse(name)
  } catch (error) {
    console.error(error);
    return { message: 'Error al obtener los cursos' }
  }
}

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
    let meanReview = 0; //promedio de reviews
    if (course.reviews.length !== 0) {
      let sumatoryReview = course.reviews.reduce(
        (prev, next) => parseInt(prev.score) + parseInt(next.score)
      );
      meanReview = Math.round(sumatoryReview / course.reviews.length); //Calcula el promedio de reviews, usamos Math.round para redondear al valor entero más cercano
    } else {
      meanReview = 0; //Si no hay reviews, el promedio es 0
    }

    let objectCourse = { //Objeto que se enviará
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

/* const getAllCourses = async (req, res) => {
  try {
    let getAllCourses = await getAllDataCourses(); //Busca todos los cursos
    res.json(getAllCourses); //Envía el array con todos los cursos
    // getInfoCourse(name)
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
}; */

const getCoursesByQuery = async (req, res, name, category, order) => {
  //name, category, order

  /* let getAllCategories = await Category.findAll() */
  //Busca todos los cursos

  let getAllCourses = await getAllDataCourses(); //Busca todos los cursos
  console.log("asdafsdASDFASFASDF123123123123131231", getAllCourses)

  
  // console.log(getAllCourses)
  
  /* if (name) {
    getAllCourses.filter(
      (x) => x.name.toLowerCase().includes(name.toLowerCase()) //Filtra por nombre
      );
    } */
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
        if (a.meanReview > b.meanReview) return -1;
        if (b.meanReview > a.meanReview) return 1;
        return 0;
      });
    }
    if (order === "minR") {
      //Ordena por review de menor a mayor
      getAllCourses = getAllCourses.sort(function (a, b) {
        if (a.meanReview > b.meanReview) return 1;
        if (b.meanReview > a.meanReview) return -1;
        return 0;
      });
    }
    if (category) {
      let filteredCourse = getAllCourses.filter(e => e.category.includes(category))
      console.log("filtrado", filteredCourse)
      } 
    console.log("" ,getAllCourses)
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

const getCourseDetail = async (req, res) => { //Obtiene el detalle de un curso
  const { id } = req.params;
  try {
    let name;
    try {
      name = await Course.findOne({ //Busca el curso por id
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
