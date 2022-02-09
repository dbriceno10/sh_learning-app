const { Router } = require("express");
const router = Router();
const {postReview} = require('./controller/review/postReview')
const {getReview} = require('./controller/review/getReview')
router.post("/",postReview)

router.get("/", getReview);

module.exports = router;
