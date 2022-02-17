const { Review } = require("../../../db.js");
const { Op } = require("sequelize");

const getStudentReview = async (req, res) => {
  const { studentId, courseId } = req.query;
  try {
    const review = await Review.findOne({
      where: {
        [Op.and]: [{ FKstudentID: studentId }, { FKcourseID: courseId }],
      },
    });
    if (!review) {
      return res.status(404).send({ flag: false });
    }
    res.status(200).send({ flag: true });
  } catch (error) {
    req.status(404).send(error);
  }
};

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
  getStudentReview
};
