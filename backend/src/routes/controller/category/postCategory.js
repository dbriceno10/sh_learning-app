const { Category} = require("../../../db.js");

const postCategory = async (req, res, next) => {
    const { categories } = req.body; //categories es un array de categorias
    try {
      for (const category of categories) { //Recorre el array de categorias
        await Category.findOrCreate({ //Busca o crea la categoria
          where: {
            name: category,
          },
        });
      }
      const categoriesCreated = await Category.findAll(); //Busca todas las categorias
      res.status(200).send(categoriesCreated);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  };

module.exports = {
  postCategory,
}