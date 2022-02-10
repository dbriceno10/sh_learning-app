const { Router } = require("express");
const router = Router();
const { postReview } = require("./controller/review/postReview");
const { getReview, getReviewById } = require("./controller/review/getReview");
router.post("/", postReview);

router.get("/", getReview);
router.get("/:id", getReviewById);

module.exports = router;
