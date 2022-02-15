const crypto = require("crypto");
const {
  Admin,
  Student,
  Teacher,
  Course,
  Review,
  Video,
  Records,
  Category,
} = require("../../db");
require("dotenv").config();
const {
  BYTES,
  BASE,
  ITERATIONS,
  LONG_ENCRYPTION,
  ENCRYPT_ALGORITHM,
  FAKE_PASSWORD,
} = process.env;

const { courseMocks, categories } = require("./mocksDataCourses");

const { getCategoryId } = require("../controller/getCategoryId");

const categoyMaker = async () => {
  for (const category of categories) {
    //Recorre el array de categorias
    await Category.findOrCreate({
      //Busca o crea la categoria
      where: {
        name: category.trim().toLowerCase(),
      },
    });
  }
};
const teacherMaker = async () => {
  const password = FAKE_PASSWORD;
  try {
    crypto.randomBytes(parseInt(BYTES), (error, salt) => {
      const newSalt = salt.toString(BASE);
      crypto.pbkdf2(
        password,
        newSalt,
        parseInt(ITERATIONS), //iteraciones para encriptar
        parseInt(LONG_ENCRYPTION), //longitud de la contraseña encriptada
        ENCRYPT_ALGORITHM, //algoritmo de encriptación
        async (error, key) => {
          const encryptedPassword = key.toString(BASE);
          await Teacher.create({
            name: "TeacherMaker",
            lastName: "BulkCreate",
            email: "makerprofesor@email.com",
            avatar:
              "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
            salt: newSalt,
            password: encryptedPassword,
            authorization: false,
            role: "profesor",
          });
        }
      );
    });
    console.log("Teacher creado con éxito");
  } catch (error) {
    console.log(error);
  }
};

const teacherMaker2 = async () => {
  try {
    const teacher = await Teacher.create({
      name: "TeacherTest1",
      lastName: "BulkCreate",
      email: "01teacher@email.com",
      avatar:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      salt: "salt",
      password: "password",
      authorization: false,
      role: "profesor",
    });
    console.log("Teacher 2 creado con éxito");
    return teacher.id;
  } catch (error) {
    console.log(error);
  }
};

const StudentMaker = async () => {
  const password = FAKE_PASSWORD;
  try {
    crypto.randomBytes(parseInt(BYTES), (error, salt) => {
      const newSalt = salt.toString(BASE);
      crypto.pbkdf2(
        password,
        newSalt,
        parseInt(ITERATIONS), //iteraciones para encriptar
        parseInt(LONG_ENCRYPTION), //longitud de la contraseña encriptada
        ENCRYPT_ALGORITHM, //algoritmo de encriptación
        async (error, key) => {
          const encryptedPassword = key.toString(BASE);
          await Student.create({
            name: "StudentMaker",
            lastName: "BulkCreate",
            email: "makerstudent@email.com",
            avatar:
              "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
            salt: newSalt,
            password: encryptedPassword,
            authorization: false,
            role: "alumno",
          });
        }
      );
    });
    console.log("Student creado con éxito");
  } catch (error) {
    console.log(error);
  }
};

const studentMaker2 = async () => {
  try {
    const student = await Student.create({
      name: "StudentTest1",
      lastName: "BulkCreate",
      email: "01student@email.com",
      avatar:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      salt: "salt",
      password: "password",
      authorization: false,
      role: "alumno",
    });
    console.log("Teacher 2 creado con éxito");
    return student.id;
  } catch (error) {
    console.log(error);
  }
};

const reviewMaker1 = async (studentId) => {
  const course = await Course.findOne({
    where: {
      name: "React: De cero a experto",
    },
  });
  await Review.create({
    score: 5,
    flag: true,
    FKstudentID: studentId,
    FKcourseID: course.id,
  });
  console.log("Review 1 creado con éxito");
};
const reviewMaker2 = async (studentId) => {
  const course = await Course.findOne({
    where: {
      name: "Node: De cero a experto",
    },
  });
  await Review.create({
    score: 3,
    flag: true,
    FKstudentID: studentId,
    FKcourseID: course.id,
  });
  console.log("Review 2 creado con éxito");
};

const reviewMaker3 = async (studentId) => {
  const course = await Course.findOne({
    where: {
      name: "Angular: De cero a experto",
    },
  });
  await Review.create({
    score: 1,
    flag: true,
    FKstudentID: studentId,
    FKcourseID: course.id,
  });
  console.log("Review 3 creado con éxito");
};

const videoMaker1 = async () => {
  const course = await Course.findOne({
    where: {
      name: "React: De cero a experto",
    },
  });
  await Video.create({
    title: "Git y Github | Curso Práctico de Git y Github Desde Cero",
    description:
      "Aprende a Dominar una de las herramienta más utilizadas por todos los desarrolladores web, programadores y expertos en código profesionales, llamada Git, un sistema de Control de versiones open source, creado por Linus Torvalds",
    url: "https://www.youtube.com/watch?v=HiXLkL42tMU",
    FKcourseID: course.id,
  });
  console.log("video 1 creado con éxito");
};

const videoMaker2 = async () => {
  const course = await Course.findOne({
    where: {
      name: "React: De cero a experto",
    },
  });
  await Video.create({
    title: "React: De cero a experto | Curso Práctico de React Desde Cero",
    description:
      "Aprende a crear una aplicación web con React, una de las librerías más utilizadas en el desarrollo de aplicaciones web, creada por Facebook.",
    url: "https://www.youtube.com/watch?v=MPLN1ahXgcs",
    FKcourseID: course.id,
  });
  console.log("video 2 creado con éxito");
};

const courseMaker = async (teacherId) => {
  console.log(teacherId);
  try {
    for (const course of courseMocks) {
      const courseCreated = await Course.create({
        name: course.name,
        description: course.description,
        price: course.price,
        img: course.img,
        FKteacherID: teacherId,
      });
      const categoryID = await getCategoryId(course.category); //Busca el id de las categorias
      // console.log('category id in post course:',categoryID);
      courseCreated.addCategory(categoryID);
    }
    console.log("Cusos creados con éxito");
  } catch (error) {
    console.log("Error al crear los cursos: ", error);
  }
};

const dataMaker = async (req, res) => {
  try {
    await categoyMaker();
    await teacherMaker();
    const teacherId = await teacherMaker2();
    await courseMaker(teacherId);
    await StudentMaker();
    const studentId = await studentMaker2();
    await reviewMaker1(studentId);
    await reviewMaker2(studentId);
    await reviewMaker3(studentId);
    await videoMaker1();
    await videoMaker2();
    res.status(200).send({ message: "Data creada" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  dataMaker,
};
