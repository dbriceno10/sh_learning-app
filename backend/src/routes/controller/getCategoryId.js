const { Category } = require("../../db.js");

async function getCategoryId(arrayCategory) {
  let categories = [];
  for (let i = 0; i < arrayCategory.length; i++) {
    categories.push(
      await Category.findOne({
        where: { name: arrayCategory[i] },
        attributes: ["id"], //saco el atributo id
      })
    );
  }
  return categories;
}

module.exports = { getCategoryId };
