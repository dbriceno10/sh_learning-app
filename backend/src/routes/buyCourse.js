const { Router } = require("express");
const router = Router();
const {postBuyCourse} = require('./controller/buy/postBuy')

router.post("/",postBuyCourse );

module.exports = router;
