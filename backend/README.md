# BACKEND

Ruta de registro recibe  name, lastName, email, password, role, avatar.
El endpoind es http://localhost:3001/register

Ruta de Login Local recibe email y password
El endpoind es http://localhost:3001/login

Se añadio la propiedad salt en los modelos de Student y Teacher, que es para encriptar y validar la password

Ruta fake de Cursos, endpoind http://localhost:3001/fakecourses

Ruta de categorias, recibe categories(un array de categorías)
El endpoind es http://localhost:3001/category

Ruta de Cursos recibe name, description, email(Del teacher), img, price, category
El endpoind es http://localhost:3001/courses, para buscar un solo curso se pasa el id por params http://localhost:3001/courses/id

Ruta de videos  Post : recibe title, description, url, duration, name(del curso asociado)
El endpoind es http://localhost:3001/video

Ruta de videos GET : recibe por query el nombre del curso y retorna la info de ese video.
El endpoind es http://localhost:3001/video


Ruta de compra de curso, de momento solo hace la relación en la tabla intermedia Course-Student, recibe nameCourse, emailStudent
El endpoind es http://localhost:3001/buy

Ruta de review, recibe nameCourse, emailStudent, score
El endpoind es http://localhost:3001/review
Para buscar las revirew de un curso en específico debemos pasarel id del curso por params http://localhost:3001/review/id

Ruta de estudiantes http://localhost:3001/students devuelve todos los estudiantes, para buscar un solo estudiante, actualizar o eliminar debemos pasar el id del estudiante por params
http://localhost:3001/students/id
La actualización recibe por body name, lastName, email y avatar como atributos que se pueden actualizar

Ruta de profesores http://localhost:3001/teachers devuelve todos los profesores, para buscar un solo profesor, actualizar o eliminar debemos pasar el id del profesor por params
http://localhost:3001/teachers/id
La actualización recibe por body name, lastName, email y avatar como atributos que se pueden actualizar