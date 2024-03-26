const mongoose = require("mongoose");

const ProductSlidersSchema = mongoose.Schema({});

const ProductsSlidersModel = mongoose.model(
  "productSliders",
  ProductSlidersSchema
);
module.exports = ProductsSlidersModel;
