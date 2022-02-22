const { Router } = require("express");
const router = Router();

const { getCv, getCvs } = require("./controller/cv/get.cv.controller");
const { postCv } = require("./controller/cv/post.cv.controller");

router.get("/", getCvs);
router.get("/detail/:id", getCv);
router.post("/create", postCv);

module.exports = router;
