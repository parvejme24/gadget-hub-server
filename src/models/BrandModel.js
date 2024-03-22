const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema({
  brand: {
    type: String,
    require: true,
  },
  logo: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const BrandModel = mongoose.model("brands", BrandSchema);
module.exports = BrandModel;
