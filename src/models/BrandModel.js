const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      require: true,
      unique: true,
    },
    brandLogo: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const BrandModel = mongoose.model("brands", BrandSchema);
module.exports = BrandModel;
