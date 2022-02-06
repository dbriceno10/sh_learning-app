const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { getCategoryId } = require("./controller/getCategoryId.js");
const { Course, Teacher } = require("../db");

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
    const courses = await Course.findAll();
    res.status(200).send(courses);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

module.exports = router;
