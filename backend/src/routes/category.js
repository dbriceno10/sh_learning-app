const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category, Course, Student, Teacher, Video, Review } = require("../db");

//*Create the categories , the input is an array of categories
router.post("/", async (req, res, next) => {
  const { categories } = req.body;
  try {

    for (const category of categories) {
      await Category.findOrCreate({
        where: {
          name: category,
        },
      });
    }
    // categories.forEach((category) => {
    //   await Category.findOrCreate({
    //     where: {
    //       name: category,
    //     },
    //   });
    // });
    const categoriesCreated = await Category.findAll();
    res.status(200).send(categoriesCreated);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.status(200).send(category);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
