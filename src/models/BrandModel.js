const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      require: true,
      unique: true,
    },
    brandImage: {
      type: String,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const BrandModel = mongoose.model("brands", BrandSchema);
module.exports = BrandModel;
