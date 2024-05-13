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

// update review by review id
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not founnd" });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete review by id
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(deletedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
