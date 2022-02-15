//Fución para los filtros de los cursos
const { getAllDataCourses } = require("./getAllDataCourses");

const getCoursesByQuery = async (req, res, category, order) => {
  //name, category, order

  /* let getAllCategories = await Category.findAll() */
  //Busca todos los cursos

  let getAllCourses = await getAllDataCourses();
  // console.log("000000000000000", getAllCourses); //Busca todos los cursos

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
    getAllCourses = await getAllCourses.filter((e) =>
      e.category.includes(category)
    );
    // console.log("filtro o no filtro? caralhoooo")
  }

  // console.log("111111111111", getAllCourses);
  res.json(getAllCourses);
};

module.exports = {
  getCoursesByQuery,
};
