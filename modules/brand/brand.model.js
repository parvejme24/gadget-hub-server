const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema({
  brandName: {
    type: String,
    required: true,
    trim: true,
  },
  brandImg: {
    url: String,
    publicId: String,
    assetId: String
  },
}, {
  timestamps: true,
  versionKey: false
});

const BrandModel = mongoose.model("brands", BrandSchema);

module.exports = BrandModel;
