const mongoose = require("mongoose");

const WishSchema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamp: true, versionKey: false }
);

const WishModel = mongoose.model("wises", WishSchema);
module.exports = WishModel;
