const mongoose = require("mongoose");

const ProducsSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    productCode: {
      type: String,
    },
    productImage: {
      type: String,
      require: true,
    },
    unitPrice: {
      type: String,
      require: true,
    },
    quantity: {
      type: String,
      require: true,
    },
    totalPrice: {
      type: String,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

const ProductsModel = mongoose.model("products", ProducsSchema);
module.exports = ProductsModel;
