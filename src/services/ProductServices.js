const { mongoose } = require("mongoose");
const ProductModel = require("../model/ProductModel");

const ObjectId = mongoose.Types.ObjectId;

const ProductService = async () => {
  try {
    let data = await ProductModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: e }.toStrig();
  }
};

module.exports = {
  ProductService,
};
