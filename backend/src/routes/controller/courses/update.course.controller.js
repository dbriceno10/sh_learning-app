const { Course, Category } = require("../../../db");
const { getInfoCourse } = require("./getInfoCourse");
const { getCategoryId } = require("../getCategoryId");
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, img } = req.body;

  try {
    const course = await Course.findOne({
      //buscamos el curso primero en base de datps
      where: { id: id },
      include: [{ model: Category }],
      attributes: ["name", "description", "price", "img"], //buscamos solo los atributos que nos interesan para comparar
    });

    if (!course) {
      return res.status(404).send({ message: "Curso no encontrado" }); //si no se encuentra el curso
    }

    await Course.update(
      //actualizamos el curso, en caso de que un campo venga vaccío lo volvemos a actualizar con lo que ya estaba en bd
      {
        name: name ? name : course.name,
        description: description ? description : course.description,
        price: price ? price : course.price,
        img: img ? img : course.img,
      },
      { where: { id: id } }
    );
    res.status(200).send({ message: "Curso actualizado" });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  updateCourse,
};
