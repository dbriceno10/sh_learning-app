# BACKEND

Ruta de registro recibe  name, lastName, email, password, role, avatar.
El endpoind es http://localhost:3001/register

Ruta fake de Cursos, endpoind http://localhost:3001/fakecourses

Ruta de categorias, recibe categories(un array de categorías)
El endpoind es http://localhost:3001/category

Ruta de Cursos recibe name, description, email(Del teacher), img, price, category
El endpoind es http://localhost:3001/courses

Ruta de videos recibe title, description, url, duration, name(del curso asociado)
El endpoind es http://localhost:3001/video

Ruta de compra de curso, de momento solo hace la relación en la tabla intermedia Course-Student, recibe nameCourse, emailStudent
El endpoind es http://localhost:3001/buy

Ruta de review, recibe nameCourse, emailStudent, score
El endpoind es http://localhost:3001/review