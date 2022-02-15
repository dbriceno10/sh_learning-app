const { Router } = require("express");
const router = Router();
const { stripePay } = require("./controller/stripe/post.stripe.controller");

router.post("/pay", stripePay);

module.exports = router;
