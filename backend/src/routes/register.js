const { Router } = require("express");
const router = Router();
const { postUser } = require("./controller/register/postUser");
const cors = require("cors");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

router.post("/", postUser);

module.exports = router;
