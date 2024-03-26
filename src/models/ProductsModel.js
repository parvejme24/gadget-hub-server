const mongoose = require("mongoose");

const ProducsSchema = mongoose.Schema(
  {
    productName: {
      type: String,
    },
    productCode: {
      type: String,
    },
    productImage: {
      type: String,
    },
    unitPrice: {
      type: String,
    },
    quantity: {
      type: String,
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
