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

const { courseMocks } = require("./mocksDataCourses");
let categories = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Node",
  "Express",
  "Angular",
  "PHP",
  "Firebase",
  "Google",
  "Java",
  "TypeScript",
  "Adobe",
  "UX/UI",
  "Web Design",
  "Responsive",
  "Metasploit",
  "Hacking",
  "Python",
  "C++",
  "C",
  "WordPress",
  "VPS",
  "SEO",
  "Golang",
  "MongoDB",
  "Microfrontends",
  "Power BI",
  "Marketing",
  "Digital",
  "Facebook",
  "Instagarm",
  "Linkedin",
  "Excel",
  "Macross",
  "Visual Basic",
  "Flutter",
  "IOS",
  "Android",
];

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
    res.status(200).send({ message: "Data creada" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  dataMaker,
};
