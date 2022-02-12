const { Course, Video } = require("../db");

const postVideo = async (req, res) => {
  // const { title, description, url, duration, courseName } = req.body;
  const { title, description, duration, url, cursoId } = req.body;
  try {
    const FK = await Course.findByPk(cursoId);
    if (!FK) {
      return res.status(404).send({ message: "El curso es inválido" });
    }
    const video = await Video.create({
      title,
      description,
      url,
      duration,
      FKcourseID: FK.id,
    });
    // console.log('llegue  a video create',FK);
    res
      .status(200)
      .send({
        message: "El video se ha creado correctamente",
        videoId: video.id,
      });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

module.exports = {
  postVideo,
};
