const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userEmail: {
      type: String,
      require: true,
    },
    review: {
      coment: { type: String, require: true },
      media: [String],
      rating: { type: String, require: true },
    },
  },
  { timestamp: true, versionKey: false }
);

const ReviewModel = mongoose.model("reviews", ReviewSchema);
module.exports = ReviewModel;
