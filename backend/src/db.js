require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { DataTypes } = require("sequelize");

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_USER}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category, Course, Student, Teacher, Video, Review, Records, Admin } = sequelize.models;

// Aca vendrian las relaciones

//?Primero vienen las relaciones de muchos a muchos
//*Relación entre Students y Courses
Student.belongsToMany(Course, { through: "Student_Course" });
Course.belongsToMany(Student, { through: "Student_Course" });
//*Relación entre Categories y Courses
Course.belongsToMany(Category, { through: "Course_Category" });
Category.belongsToMany(Course, { through: "Course_Category" });
//Relación entre historial y estudiantes
// Student.belongsToMany(Records, { through: "Student_Records" });
// Records.belongsToMany(Student, { through: "Student_Records" });

//?Ahora vienen las relaciones de uno a muchos
//?Relación entre Teachers y Courses
// Course.belongsTo(Teacher, { as: "profesor" });
Teacher.hasMany(Course, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "FKteacherID",
  },
});
Course.belongsTo(Teacher);

//?Relación entre Courses y Videos
Course.hasMany(Video, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "FKcourseID",
  },
});
Video.belongsTo(Course);

//? Relación entre Estudiante, Review y Curso
//? Relación entre Estudiante y Review
// Student.hasMany(Review)
// Review.belongsTo(Student)
Student.hasMany(Review, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "FKstudentID",
  },
});
Review.belongsTo(Student);

//? Relación entre Cursos y Review
// Course.hasMany(Review)
// Review.belongsTo(Course)
Course.hasMany(Review, {
  foreignKey: {
    type: DataTypes.UUID,
    allowNull: false,
    name: "FKcourseID",
  },
});
Review.belongsTo(Course);



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
