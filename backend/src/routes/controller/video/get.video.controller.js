const { Video } = require("../../../db");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll({
      where: {},
      attributes: ["id", "title", "description", "url", "FKcourseID"],
    });
    res.status(200).send(videos);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

const getVideoDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findOne({
      where: { id },
      attributes: ["id", "title", "description", "url", "FKcourseID"],
    });
    if (!video) {
      return res.status(404).send({ message: "El video no existe" });
    }
    res.status(200).send(video);
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

const getCourseVideos = async (req, res) => {
  const { courseId } = req.params;
  try {
    const videos = await Video.findAll({
      where: { FKcourseID: courseId },
      attributes: ["id", "title", "description", "url", "FKcourseID"],
    });
    if (!videos) {
      return res.status(404).send({ message: "No hay videos" });
    }
    res.status(200).send(videos);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  getAllVideos,
  getVideoDetail,
  getCourseVideos,
};
