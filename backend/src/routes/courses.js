const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { getCategoryId } = require("./controller/getCategoryId.js");

const {getCourses} = require('./controller/get.courses')

const { Category, Course, Student, Teacher, Video, Review } = require("../db");


router.post("/", async (req, res, next) => {
  //*email is of the teacher, category must be an array
  const { name, description, email, img, price, category } = req.body;
  try {
    const FK = await Teacher.findOne({
      //Busca el id del teacher
      where: {
        email: email,
      },
    });
    const courseCreated = await Course.create({
      //Crea el curso
      name,
      description,
      price,
      img,
      FKteacherID: FK.id,
      score: "5",
    });
    const categoryID = await getCategoryId(category); //Busca el id de las categorias
    // console.log('category id in post course:',categoryID);
    courseCreated.addCategory(categoryID); //Agrega las categorias al curso
    res.status(200).send(courseCreated);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let courses = await Course.findAll({
      include: {
        model: Category,
        attributes: ["name"], //trae la data mediante el nombre(la propiedad del modelo type)
        // exclude: ["description"],
        thorugh: {
          attributes: [], //para comprobación, siempre va
        },
      },
      attributes: ["id", "name", "description", "price", "img", "FKteacherID", "score"],//score es temporal
    });
    let response = courses.map((e) => {
      return e.categories.map((e) => {
        return e.name;
      });
    });
    // courses = courses.map((course) => {
    //   return course.categories.map((e) => {
    //     return e.name;
    //   });
    // });
    res.status(200).send(courses);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});


router.get('/', getCourses) //trae todos los cursos

module.exports = router;
