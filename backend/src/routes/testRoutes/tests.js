const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review } = require("../../db.js");

async function getCategoryData(data) {
  const id = await Category.findOne({
    where: { name: data },
    attributes: ["id"],
  });

  return id;
}

router.get("/prueba", async (req, res, next) => {
  res.status(200).send("Hola soy un GET");
});

router.post("/students", async (req, res, next) => {
  const { name, lastName, email, password, avatar } = req.body;
  try {
    const student = await Student.create({
      name,
      lastName,
      email,
      password,
      avatar,
    });
    res.status(200).send(student);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).send(students);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/courses", async (req, res, next) => {
  const { name, description, email, img, price, category } = req.body;
  try {
    const FK = await Teacher.findOne({
      where: {
        email: email,
      },
    });
    const courseCreated = await Course.create({
      name,
      description,
      price,
      img,
      FKteacherID: FK.id,
    });
    //Guarda el id del curso y el id de la categoria en la tabla de relaciones
    // const categoryID = await getCategoryData(category);
    // await courseCreated.setCategory(categoryID);
    // const course = await Course.findOne({
    //   where: {
    //     id: courseCreated.id,
    //   },
    //   include: Category,
    // });
    // res.status(200).send(course);

    res.status(200).send(courseCreated);
  } catch (error) {
    console.error(error.message);
    res.status(404).send(error);
  }
});

router.get("/courses", async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/teachers", async (req, res, next) => {
  const { name, lastName, email, password, avatar } = req.body;
  try {
    const teacher = await Teacher.create({
      name,
      lastName,
      email,
      password,
      avatar,
    });
    res.status(200).send(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(404).send(error);
  }
});

router.get("/teachers", async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).send(teachers);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/videos", async (req, res, next) => {
  const { title, description, url, duration, name } = req.body;
  try {
    const FK = await Course.findOne({
      where: {
        name: name,
      },
    });
    const video = await Video.create({
      title,
      description,
      url,
      duration,
      FKcourseID: FK.id,
    });
    res.status(200).send(video);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/videos", async (req, res, next) => {
  try {
    const videos = await Video.findAll();
    res.status(200).send(videos);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/category", async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await Category.findOrCreate({
      where: {
        name,
      },
    });
    res.status(200).send(category);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/category", async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.status(200).send(category);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/review", async (req, res, next) => {
  const { nameCourse, emailStudent, score } = req.body;
  const FKCourse = await Course.findOne({
    where: {
      name: nameCourse,
    },
  });
  const FKStudent = await Student.findOne({
    where: {
      email: emailStudent,
    },
  });
  const flag = await Review.findOne({
    where: {
      FKstudentID: FKStudent.id,
    },
    attributes: ["flag"],
  });
  if (!flag) {
    try {
      const review = await Review.create({
        score,
        flag: true,
        FKstudentID: FKStudent.id,
        FKcourseID: FKCourse.id,
      });
      //cambiar el valor de flag a true
      // await Review.update(
      //   {
      //     flag: true,
      //   },
      //   {
      //     where: {
      //       FKstudentID: FKStudent.id,
      //     },
      //   }
      // );
      res.status(200).send(review);
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    res.status(404).send("Ya has calificado este curso");
  }
});

router.get("/review", async (req, res, next) => {
  try {
    const review = await Review.findAll();
    res.status(200).send(review);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
