const { Category} = require("../../../db.js");

const getCategory = async (req, res, next) => {
    try {
      const category = await Category.findAll();
      res.status(200).send(category);
    } catch (error) {
      res.status(404).send(error);
    }
  };

module.exports = {
  getCategory,
}