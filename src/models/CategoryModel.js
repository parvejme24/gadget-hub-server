const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      require: true,
      require: true,
    },
    categoryImage: {
      type: String,
      require: true,
    },
    subcategories: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false }
);

const CategoryModel = mongoose.model("categories", CategorySchema);
module.exports = CategoryModel;
