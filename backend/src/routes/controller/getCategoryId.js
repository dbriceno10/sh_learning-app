const { Category } = require("../../db.js");

//Esta función busca las recibe una o más categorías y va a la base de datos a buscar sus id

async function getCategoryId(arrayCategory) {
  //Recibe un array de categorias
  let categories = [];
  for (let i = 0; i < arrayCategory.length; i++) {
    //Recorre el array de categorias
    categories.push(
      //Agrega el id de la categoria
      await Category.findOne({
        where: { name: arrayCategory[i].toLowerCase() }, //Busca la categoria
        attributes: ["id"], //saco el atributo id
      })
    );
  }
  return categories;
}

//Esta función hace lo opuesto a la anterior, busca las categorias por su id y devuelve un array de nombres

async function getCategoryNames(arrayId) {
  //Recibe un array de id
  let categories = [];
  for (let i = 0; i < arrayId.length; i++) {
    //Recorre el array de id
    let name = await Category.findOne({
      where: { id: arrayId[i] }, //Busca la categoria
      // attributes: ["name"], //saco el atributo name
    });
    categories.push(name.name);
  }
  return categories;
}

module.exports = { getCategoryId, getCategoryNames };
