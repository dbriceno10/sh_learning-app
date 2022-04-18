const { Router } = require("express");
const router = Router();
const {
  getAllVideos,
  getVideoDetail,
  getCourseVideos,
} = require("./controller/video/get.video.controller");
const { postVideo } = require("./controller/video/post.video.controller");
const { postRecord } = require("./controller/video/post.record.controller");
const { updateVideo } = require("./controller/video/update.video.controller");
const { deleteVideo } = require("./controller/video/delete.video.controller");

router.get("/", getAllVideos);
router.get("/detail/:id", getVideoDetail);
router.get("/course/:courseId", getCourseVideos);
router.post("/create", postVideo);
router.post("/newrecord", postRecord); //para crear un nuevo record, recibe parámetros por query
router.put("/update/:id", updateVideo);
router.delete("/delete/:id", deleteVideo);

module.exports = router;
