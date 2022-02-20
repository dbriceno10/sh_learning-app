const { Router } = require("express");
const router = Router();
const {
  upload,
  uploadFiles,
  homePage,
} = require("./controller/upload/files.controller");

router.get("/", homePage);
router.post("/files", upload.single("file"), uploadFiles);

module.exports = router;
