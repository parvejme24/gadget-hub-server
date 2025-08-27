const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    subCategoryName: {
      type: String,
      required: true,
      trim: true,
    },
    subCategoryImg: {
      url: String,
      publicId: String,
      assetId: String,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
