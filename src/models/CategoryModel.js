const mongoose = require("mongoose");

const CategoryData = mongoose.Schema({
  category_name: {
    type: String,
    require: true,
  },
  category_image: {
    type: String,
    require: true,
  },
  subcategories: {
    type: [String],
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const CategoryModel = mongoose.model("categories", CategoryData);
module.exports = CategoryModel;
