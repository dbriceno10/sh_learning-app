const { Review } = require("../../../db.js");

const getReview = async (req, res, next) => {
    try {
      const review = await Review.findAll();
      res.status(200).send(review);
    } catch (error) {
      res.status(404).send(error);
    }
  
}

module.exports={
    getReview,
}