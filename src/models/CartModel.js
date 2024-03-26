const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    color: { type: String },
    price: { type: String },
    quantity: { type: String },
    size: { type: String },
  },
  { timestamp: true, versionKey: false }
);

const CartModel = mongoose.model("carts", CartSchema);
module.exports = CartModel;
