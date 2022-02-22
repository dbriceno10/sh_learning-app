const { Cv } = require("../../../db");

const getCvs = async (req, res) => {
  try {
    const cvs = await Cv.findAll();
    res.send(cvs);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getCv = async (req, res) => {
  const { id } = req.params;
  try {
    const cv = await Cv.findByPk(id);
    if (!cv) {
      return res.status(404).send({ message: "El cv no existe" });
    }
    res.send(cv);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getCvs,
  getCv,
};
