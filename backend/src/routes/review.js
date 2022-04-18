const { Router } = require("express");
const router = Router();
const { postReview } = require("./controller/review/post.review.controller");
const {
  getReview,
  getReviewById,
  getStudentReview,
} = require("./controller/review/get.review.controller");

router.post("/create", postReview);
router.get("/", getReview);
router.get("/detail/:id", getReviewById);
router.get("/verify", getStudentReview);

module.exports = router;
