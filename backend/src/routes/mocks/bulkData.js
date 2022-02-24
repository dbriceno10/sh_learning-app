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

const { courseMocks, videos, imagenes } = require("./mocksDataCourses");

const { getCategoryId } = require("../controller/getCategoryId");

//función que retorna un número aleatorio entero entre 1 y 5
const randomNumber = () => {
  let randomNumber = Math.floor(Math.random() * 5) + 1;
  return randomNumber;
};

const randomVideosImg = () => {
  let randomNumber = Math.floor(Math.random() * 10) + 1;
  return randomNumber;
};

const randomVideosUrl = () => {
  let randomNumber = Math.floor(Math.random() * 11) + 1;
  return randomNumber;
};

const uniqueCategories = (courses) => {
  let array = [];
  //almacena en un objeto cada curso solo una vez
  courses.forEach((course) => {
    course.category.forEach((e) => {
      array.push(e);
    });
  });
  //elimina los elementos que esten repetidos en el array
  const unique = [...new Set(array)];
  return unique;
};

const randomPrice = () => {
  let randomNumber = Math.floor(Math.random() * 999) + 10;
  return randomNumber;
};

const categories = uniqueCategories(courseMocks);

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
      name: "Jhon",
      lastName: "Mircha",
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

const reviewMaker = async (studentId) => {
  const courses = await Course.findAll({});
  for (const course of courses) {
    await Review.create({
      score: randomNumber(),
      flag: true,
      FKstudentID: studentId,
      FKcourseID: course.id,
    });
  }
};

const videoMaker = async () => {
  const courses = await Course.findAll({});
  for (const course of courses) {
    let count = 1;
    for (const video of videos) {
      const index2 = randomVideosUrl();
      const index = randomVideosImg();
      await Video.create({
        title: `Clase Nro ${count}`,
        description:
          "Aprende a Dominar una de las herramienta más utilizadas por todos los desarrolladores web, programadores y expertos en código profesionales.",
        url: videos[index - 1],
        FKcourseID: course.id,
        img: imagenes[index - 1],
      });
      count++;
    }
  }
};

const courseMaker = async (teacherId) => {
  try {
    for (const course of courseMocks) {
      const index = randomVideosImg();
      const courseCreated = await Course.create({
        name: course.name,
        description: course.description,
        price: randomPrice(),
        img: imagenes[index - 1],
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

const buyMaker = async (studentId) => {
  const courses = await Course.findAll({});
  const student = await Student.findOne({
    //Busca el estudiante
    where: {
      id: studentId,
    },
  });
  for (const course of courses) {
    student.addCourse(course.id);
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
    await reviewMaker(studentId);
    await videoMaker();
    await buyMaker(studentId);
    res.status(200).send({ message: "Data creada" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  dataMaker,
};
