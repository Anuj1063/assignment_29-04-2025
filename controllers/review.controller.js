const reviewModel = require("../models/review.model");

class ReviewController {
  async createReview(req, res) {
    try {
      const { productId, rating, review, userId } = req.body;

      const reviews = await reviewModel.create({
        productId,
        rating:Math.round(rating,2),
        review,
        userId,
      });

      if (reviews) {
        return res.status(201).json({
          status: true,
          message: "Created Successfully!!!",
          reviews,
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Internal server Error",
        error: error,
      });
    }
  }

  async reviewDetails(req, res) {
    try {
      const productReview = await reviewModel.find({isDeleted:false});

      if (productReview) {
        return res.status(200).json({
          status: true,
          msg: "data Fetched",
          productReview,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error,
        msg: "Internal server errror",
      });
    }
  }
}
module.exports = new ReviewController();
