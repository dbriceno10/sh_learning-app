const { Category } = require("../../db.js");

//Esta función busca las recibe una o más categorías y va a la base de datos a buscar sus id

async function getCategoryId(arrayCategory) { //Recibe un array de categorias
  let categories = [];
  for (let i = 0; i < arrayCategory.length; i++) { //Recorre el array de categorias
    categories.push( //Agrega el id de la categoria
      await Category.findOne({
        where: { name: arrayCategory[i] }, //Busca la categoria
        attributes: ["id"], //saco el atributo id
      })
    );
  }
  return categories;
}

module.exports = { getCategoryId };
