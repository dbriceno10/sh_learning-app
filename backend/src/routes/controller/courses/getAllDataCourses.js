//Función para obtener la data de todos los cursos
const { Course } = require("../../../db.js");
const { getInfoCourse } = require("./getInfoCourse");

const getAllDataCourses = async () => {
  try {
    let getAllCourses = await Course.findAll({
      //Busca todos los cursos
      attributes: ["name"],
    });
    let arrayAllCoursesInfo = []; //Array que contendrá todos los cursos
    for (const courseName of getAllCourses) {
      //Recorre todos los cursos
      let temporaryInfo = await getInfoCourse(courseName.dataValues.name); //Obtiene la información del curso
      arrayAllCoursesInfo.push(temporaryInfo); //Agrega la información del curso al array
    }
    return arrayAllCoursesInfo;
    // getInfoCourse(name)
  } catch (error) {
    console.error(error);
    return { message: "Error al obtener los cursos" };
  }
};

const getAllDataCoursesOfOneTeacher = async ( teacherId ) => {
  try {
    let getAllCourses = await Course.findAll({
      //Busca todos los cursos de un profesor
      where :{
        FKteacherID: teacherId
      },
      attributes: ["name"],
    });
    let arrayAllCoursesInfo = []; //Array que contendrá todos los cursos
    for (const courseName of getAllCourses) {
      //Recorre todos los cursos
      let temporaryInfo = await getInfoCourse(courseName.dataValues.name); //Obtiene la información del curso
      arrayAllCoursesInfo.push(temporaryInfo); //Agrega la información del curso al array
    }
    return arrayAllCoursesInfo;
    // getInfoCourse(name)
  } catch (error) {
    console.error(error);
    return { message: "Error al obtener los cursos" };
  }
};

module.exports = {
  getAllDataCourses,
  getAllDataCoursesOfOneTeacher
};
