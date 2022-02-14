const { Review } = require("../../../db.js");

const getReview = async (req, res) => {
  try {
    const review = await Review.findAll();
    if (!review) {
      res.status(404).send({ message: "Aún no hay reviews" });
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findAll({
      where: {
        FKcourseID: id,
      },
    });
    if (!review.length) {
      return res.status(404).send({ message: "El curso aún no tiene reviews" });
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getReview,
  getReviewById,
};
