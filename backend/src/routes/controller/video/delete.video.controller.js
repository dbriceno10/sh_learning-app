const { Video } = require("../../../db");

const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findOne({
      where: { id: id },
      attributes: ["title", "description", "url", "FKcourseID"],
    });
    if (!video) {
      return res.status(404).send({ message: "El video no existe" });
    }
    await Video.destroy({
      where: { id },
    });
    res
      .status(200)
      .send({ message: "El video se ha eliminado correctamente", video });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

module.exports = {
  deleteVideo,
};
