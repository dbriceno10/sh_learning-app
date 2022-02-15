//Función para obtener la infomación de un curso
const { Category, Course, Review, Teacher } = require("../../../db.js");

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
      let arrayScore = [];
      course.reviews.forEach((review) => {
        arrayScore.push(review.score);
      });
      let sumatoryReview = arrayScore.reduce(
        (prev, next) => parseInt(prev) + parseInt(next)
      );
      meanReview = Math.round(sumatoryReview / course.reviews.length); //Calcula el promedio de reviews, usamos Math.round para redondear al valor entero más cercano
    } else {
      meanReview = 0; //Si no hay reviews, el promedio es 0
    }
    //Obtener el nombre del Teacher
    const teacher = await Teacher.findOne({
      where: {
        id: course.FKteacherID,
      },
    });
    let objectCourse = {
      //Objeto que se enviará
      id: course.id,
      name: course.name,
      description: course.description,
      price: course.price,
      img: course.img,
      teacherID: course.FKteacherID,
      teacherName: teacher.name,
      teacherLastName: teacher.lastName,
      category: arrayCategories,
      meanReview: meanReview,
    };
    return objectCourse;
  } catch (err) {
    console.error(err);
    console.log("Error in getInfoCourse");
  }
};

module.exports = {
  getInfoCourse,
};
