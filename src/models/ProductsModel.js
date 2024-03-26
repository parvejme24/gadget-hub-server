const mongoose = require("mongoose");

const ProducsSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    price: {
      type: String,
    },
    discount: {
      type: Boolean,
    },
    discountPrice: {
      type: String,
    },
    image: {
      type: String,
      require: true,
    },
    star: {
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
    category: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const ProductsModel = mongoose.model("products", ProducsSchema);
module.exports = ProductsModel;
