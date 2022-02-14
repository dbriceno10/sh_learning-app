const { Course, Video } = require("../../../db");

const postVideo = async (req, res) => {
  // const { title, description, url, duration, courseName } = req.body;
  const { title, description,  url, cursoId } = req.body;
  try {
    const FK = await Course.findByPk(cursoId);
    if (!FK) {
      return res.status(404).send({ message: "El curso es inválido" });
    }
    const urlVideo = await Video.findOne({
      where: {
        url: url
      }
    })
    if(urlVideo.url === url) {
      return res.status(404).send({ message: "Est video ya se encuentra agregado a la plataforma "})
    }
    const video = await Video.create({
      title,
      description,
      url,
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
