const { Router } = require("express");
const { route } = require("./confirm_put");
const router = Router();

const {
  updatePassword,
} = require("./controller/updatePassword/update.password.controller");

router.put("/update", updatePassword);

module.exports = router;
