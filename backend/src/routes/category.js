const { Router } = require("express");
const router = Router();
const {
  postCategory,
} = require("./controller/category/post.category.controller");
const {
  getCategory,
} = require("./controller/category/get.category.controller");
const {
  deleteCategory,
} = require("./controller/category/delete.category.controller");

//*Create the categories , the input is an array of categories
router.post("/create", postCategory);

router.get("/", getCategory);

router.delete("/delete/:id", deleteCategory);

module.exports = router;
