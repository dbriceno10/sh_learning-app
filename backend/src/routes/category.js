const { Router } = require("express");
const router = Router();
const { postCategory } = require('./controller/category/postCategory')
const { getCategory } = require('./controller/category/getCategory')
const { deleteCategory } = require('./controller/category/deleteCategory')

//*Create the categories , the input is an array of categories
router.post("/",postCategory );

router.get("/", getCategory);

router.delete("/", deleteCategory);

module.exports = router;
