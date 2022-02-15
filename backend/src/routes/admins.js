const { Router } = require("express");

const router = Router();

const {
  getAdmin,
  getAdmins,
} = require("./controller/admin/get.admin.controller");
const { updateAdmin } = require("./controller/admin/update.admin.controller");
const { deteteAdmin } = require("./controller/admin/delete.admin.controller");

router.get("/", getAdmins);
router.get("/detail/:id", getAdmin);
router.put("/update/:id", updateAdmin);
router.delete("/delete/:id", deteteAdmin);

module.exports = router;
