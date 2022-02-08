const { Course } = require("../../db.js");

const {
    filterCategory,
} = require('./middleware')


const getCourses = async (req,res) => {
    const{
        name,
        category,
        order
    } = req.query;

    let getAllCourses = await Course.findAll()
    console.log(getAllCourses)
    if (category) {
        filterCategory(category, getAllCourses)
    }

    if (name){
        getAllCourses.filter(x => x.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (order==='maxP') {
        getAllCourses = getAllCourses.sort(function (a, b) {
            if (a.price > b.price) return -1;
            if (b.price > a.price) return 1;
            return 0;
        })
    }
    if (order === "minP") {
        getAllCourses = getAllCourses.sort(function (a, b) {
            if (a.price > b.price) return 1;
            if (b.price > a.price) return -1;
            return 0;
        })
    }
    if (order === "maxR") {
        getAllCourses = getAllCourses.sort(function (a, b) {
            if (a.rating > b.rating) return -1;
            if (b.rating > a.rating) return 1;
            return 0;
        })
    }
    if (order === "minR") {
        getAllCourses = getAllCourses.sort(function (a, b) {
            if (a.rating > b.rating) return 1;
            if (b.rating > a.rating) return -1;
            return 0;
        })
    }
    res.json(getAllCourses)
}

const getCourseById = async (id) => {
    try {
      const courseById = await Course.findByPk(id.toUpperCase())
      console.log(courseById)
      return courseById
    } catch (error) {
      console.log(error)
    }
  }

module.exports = {
    getCourses,
    getCourseById
}