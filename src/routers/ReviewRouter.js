const express = require("express");
const {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByProductId,
} = require("../controllers/ReviewController");
const reviewRouter = express.Router();

reviewRouter.post("/reviews", addReview);
reviewRouter.get("/reviews/:productID", getReviewsByProductId);
reviewRouter.put("/reviews/u/:id", updateReview);
reviewRouter.delete("/reviews/d/:id", deleteReview);

module.exports = reviewRouter;
