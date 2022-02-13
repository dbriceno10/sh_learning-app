# BACKEND

Ruta de registro recibe  name, lastName, email, password, role, avatar.
El endpoind es http://localhost:3001/register

Ruta de Login Local recibe email y password
El endpoind es http://localhost:3001/login

Se añadio la propiedad salt en los modelos de Student y Teacher, que es para encriptar y validar la password

Ruta fake de Cursos, endpoind http://localhost:3001/fakecourses

Ruta de categorias, recibe name que puede ser una sola categoría o un array de categorías
El endpoind es http://localhost:3001/category/create ---> recibe name por nombre para crear categorias
El endpoind es http://localhost:3001/category se puede hacer un get para trater todas las categorías creadas
El endpoind es http://localhost:3001/category/delete ---> recibe el nombre de una categoría por body para borrarla de la base de datos

Ruta de Cursos recibe name, description, email(Del teacher), img, price, category
El endpoind es http://localhost:3001/courses/create ---> para crear un curso
http://localhost:3001/courses/detail/id ---> para obtener los detalles de un curso, recibe el id del curso por params
http://localelhost:3001/courses/update/id ---> recibe el id del curso por params, y el name, description, price e img por body para actualizar
http://localhost:3001/courses/delete/id ---> recibe el id del curso por params para eliminarlo de la base de datos

Ruta de videos  Post : recibe title, description, url, courseId(id del curso) por body
El endpoind es http://localhost:3001/video/create

Ruta de videos GET : 
El endpoind es http://localhost:3001/video ---> Trae todos los videos
http://localhost:3001/video/detail/id ---> recibe el id de un curso por params, trae la info de ese curso
http://localhost:3001/course/courseId ---> recibe por params el courseId de un curso, trae todos los videos de ese curso
http://localhost:3001/video/update ---> recibe por body el title, description, url e id de un video para actualizar
http://localhost:3001/delete ---> recibe por params el id de un curso para borrarlo de la base de datos


Ruta de compra de curso, de momento solo hace la relación en la tabla intermedia Course-Student, recibe nameCourse, emailStudent
El endpoind es http://localhost:3001/buy

Ruta de review, recibe nameCourse, emailStudent, score
El endpoind es http://localhost:3001/review/create ---> para crear el curso
http://localhost:3001/review/detail/id ---> recibe el id del curso por params para buscar los detalles de una review
http://localhost:3001/review/ ---> para obtener todas las reviews


Ruta de estudiantes http://localhost:3001/students devuelve todos los estudiantes, para buscar un solo estudiante, actualizar o eliminar debemos pasar el id del estudiante por params
La actualización recibe por body name, lastName, email y avatar como atributos que se pueden actualizar
http://localhost:3001/students/details/id ---> recibe por params  el id de un estudiante para cargar sus datos
http://localhost:3001/students/update/id ---> recibe por params el id del estuiante y por body el name, lastName, email y avatar para actualizar los datos del estudiante
http://localhost:3001/students/delete/id ---> recibe por params el id del estudiante para eliminarlo de la base de datos


Ruta de estudiantes http://localhost:3001/teachers devuelve todos los profesores, para buscar un solo profesor, actualizar o eliminar debemos pasar el id del profesor por params
La actualización recibe por body name, lastName, email y avatar como atributos que se pueden actualizar
http://localhost:3001/teachers/details/id ---> recibe por params  el id de un profesor para cargar sus datos
http://localhost:3001/teachers/update/id ---> recibe por params el id del profesor y por body el name, lastName, email y avatar para actualizar los datos del profesor
http://localhost:3001/teachers/delete/id ---> recibe por params el id del profesor para eliminarlo de la base de datos
