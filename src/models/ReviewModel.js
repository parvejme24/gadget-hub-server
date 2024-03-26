const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    description: { type: String },
    rating: { type: String },
  },
  { timestamp: true, versionKey: false }
);

const ReviewModel = mongoose.model("reviews", ReviewSchema);
module.exports = ReviewModel;
