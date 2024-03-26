const mongoose = require("mongoose");

const FeaturesSchema = mongoose.Schema(
  {
    name: { type: String },
    descriptio: { type: String },
    img: { type: String },
  },
  { timestamp: true, versionKey: false }
);

const FeaturesModel = mongoose.model("features", FeaturesSchema);
module.exports = FeaturesModel;
