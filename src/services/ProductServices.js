const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SliderModel = require("../models/ProductSlidersModel");
const ProductModel = require("../models/ProductsModel");
const ProductDetaailsModel = require("../models/ProductDetailsModel");
const ReviewModel = require("../models/ReviewModel");

const BrandListService = async () => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const CategoryListService = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const SliderListServicee = async () => {
  try {
    let data = await SliderModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const ProductListService = async () => {
  try {
    let data = await ProductModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const ListByBrandService = async () => {};

const ListByCategoryService = async () => {};

module.exports = {
  BrandListService,
  CategoryListService,
  SliderListServicee,
  ProductListService,
  ListByBrandService,
  ListByCategoryService,
};
