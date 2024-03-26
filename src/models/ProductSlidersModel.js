const mongoose = require("mongoose");

const ProductSlidersSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  { timestamps: true, versionKey: true }
);

const ProductsSlidersModel = mongoose.model(
  "productSliders",
  ProductSlidersSchema
);
module.exports = ProductsSlidersModel;
