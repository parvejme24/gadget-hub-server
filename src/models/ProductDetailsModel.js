const mongoose = require("mongoose");

const ProductDetailsSchema = mongoose.Schema({
  images: [String],
  description: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const ProductDetailsModel = mongoose.model(
  "productDetails",
  ProductDetailsSchema
);
module.exports = ProductDetailsModel;
