const { Category} = require("../../../db.js");

const postCategory = async (req, res, next) => {
    const { categories } = req.body;
    try {
  
      for (const category of categories) {
        await Category.findOrCreate({
          where: {
            name: category,
          },
        });
      }
      const categoriesCreated = await Category.findAll();
      res.status(200).send(categoriesCreated);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  };

module.exports = {
  postCategory,
}