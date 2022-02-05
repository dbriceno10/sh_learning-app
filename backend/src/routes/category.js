const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Category } = require("../db");

router.post("/", async (req, res, next) => {
  const { categories } = req.body;
  try {
    categories.forEach((category) => {
      Category.findOrCreate({
        where: {
          name: category,
        },
      });
    });
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
