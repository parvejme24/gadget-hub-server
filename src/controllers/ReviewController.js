const Review = require("../models/ReviewModel");

// add new review controller
exports.addReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.json({ newReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getting review by product Id
exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
