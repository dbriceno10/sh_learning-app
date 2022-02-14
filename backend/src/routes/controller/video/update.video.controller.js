const { Video } = require("../../../db");

const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, url } = req.body;
  // console.log(id);
  try {
    const video = await Video.findOne({
      where: { id: id },
      attributes: ["title", "description", "url"],
    });
    if (!video) {
      return res.status(404).send({ message: "El video no existe" });
    }
    await Video.update(
      {
        title: title ? title : video.title,
        description: description ? description : video.description,
        url: url ? url : video.url,
      },
      { where: { id: id } }
    );
    res
      .status(200)
      .send({ message: "El video se ha actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
};

module.exports = {
  updateVideo,
};
