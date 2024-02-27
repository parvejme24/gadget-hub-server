const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    discount: {
      type: Boolean,
      require: true,
    },
    discountPrice: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    starRating: {
      type: String,
      require: true,
    },
    stock: {
      type: Boolean,
      require: true,
    },
    remark: {
      type: String,
      require: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    brandID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
