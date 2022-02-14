# BACKEND

Ruta de registro recibe  name, lastName, email, password, role, avatar.
POST: El endpoind es http://localhost:3001/register

Ruta de Login Local recibe email y password
POST: El endpoind es http://localhost:3001/login

Se añadio la propiedad salt en los modelos de Student y Teacher, que es para encriptar y validar la password

GET: Ruta fake de Cursos, endpoind http://localhost:3001/fakecourses

Ruta de categorias, recibe name que puede ser una sola categoría o un array de categorías
POST: El endpoind es http://localhost:3001/category/create ---> recibe name por nombre para crear categorias
GET: El endpoind es http://localhost:3001/category se puede hacer un get para trater todas las categorías creadas
DELETE: El endpoind es http://localhost:3001/category/delete ---> recibe el nombre de una categoría por body para borrarla de la base de datos

Ruta de Cursos recibe name, description, email(Del teacher), img, price, category
POST: El endpoind es http://localhost:3001/courses/create ---> para crear un curso
GET: http://localhost:3001/courses/detail/id ---> para obtener los detalles de un curso, recibe el id del curso por params
PUT: http://localelhost:3001/courses/update/id ---> recibe el id del curso por params, y el name, description, price e img por body para actualizar
DELETE: http://localhost:3001/courses/delete/id ---> recibe el id del curso por params para eliminarlo de la base de datos

Ruta de videos  Post : recibe title, description, url, courseId(id del curso) por body
POST: El endpoind es http://localhost:3001/video/create

Ruta de videos GET :
GET: El endpoind es http://localhost:3001/video ---> Trae todos los videos
GET: http://localhost:3001/video/detail/id ---> recibe el id de un curso por params, trae la info de ese curso
GET: http://localhost:3001/video/course/courseId ---> recibe por params el courseId de un curso, trae todos los videos de ese curso
PUT: http://localhost:3001/video/update/od ---> recibe por body el title, description, url. El id de un video por params, para actualizar
DELETE: http://localhost:3001/delete/id ---> recibe por params el id de un video por params para borrarlo de la base de datos

Ruta de review
POST: El endpoind es http://localhost:3001/review/create ---> para crear el curso recibe recibe courseId, studentId, score por body
GET: http://localhost:3001/review/detail/id ---> recibe el id del curso por params para buscar los detalles de una review
GET: http://localhost:3001/review/ ---> para obtener todas las reviews


Ruta de estudiantes
GET: http://localhost:3001/students devuelve todos los estudiantes, para buscar un solo estudiante, actualizar o eliminar debemos pasar el id del estudiante por params
La actualización recibe por body name, lastName, email y avatar como atributos que se pueden actualizar
GET: http://localhost:3001/students/details/id ---> recibe por params  el id de un estudiante para cargar sus datos
PUT: http://localhost:3001/students/update/id ---> recibe por params el id del estuiante y por body el name, lastName, email y avatar para actualizar los datos del estudiante
DELETE: http://localhost:3001/students/delete/id ---> recibe por params el id del estudiante para eliminarlo de la base de datos


Ruta de profesores
GET: http://localhost:3001/teachers devuelve todos los profesores, para buscar un solo profesor, actualizar o eliminar debemos pasar el id del profesor por params
La actualización recibe por body name, lastName, email y avatar como atributos que se pueden actualizar
GET: http://localhost:3001/teachers/details/id ---> recibe por params  el id de un profesor para cargar sus datos
PUT: http://localhost:3001/teachers/update/id ---> recibe por params el id del profesor y por body el name, lastName, email y avatar para actualizar los datos del profesor
DELETE: http://localhost:3001/teachers/delete/id ---> recibe por params el id del profesor para eliminarlo de la base de datos

Ruta de pasarela de pago con Stripe
POST: http://localhost:3001/stripe/pay ---> Ruta para utilizar la pasarela de pagos de stripe, recibe por body amount(monto), email(un email válido cualquiera), token, studentId, courseId. Procesa el pago, y guarda en la base de datos el id del estudiante y del curso.

#Variables de entorno necesarias

DB_USER=
DB_PASSWORD=
DB_HOST=
PORT=
DB_NAME=
BYTES=
BASE=
ITERATIONS=
LONG_ENCRYPTION=
ENCRYPT_ALGORITHM=
SECRET_STRING=
CLIENT_ID=
EMAIL_USER=
PASSWORD_USER=
STRIPE_KEY=