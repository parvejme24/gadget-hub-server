const BrandModel = require("../models/BrandModel");
const {
  BrandListService,
  CategoryListService,
  SliderListServicee,
  ProductListService,
  ListByBrandService,
  ListByCategoryService,
} = require("../services/ProductServices");

exports.ProductBrandList = async (req, res) => {
  let result = await BrandListService();
  return res.status(200).json(result);
};

exports.ProductCategoryList = async (req, res) => {
  let result = await CategoryListService();
  return res.status(200).json(result);
};

exports.ProductSliderList = async (req, res) => {
  let result = await SliderListServicee();
  return res.status(200).json(result);
};

exports.ProductListByBrand = async (req, res) => {
  let result = await ListByBrandService();
  return res.status(200).json(result);
};

exports.ProductListByCategory = async (req, res) => {
  let result = await ListByCategoryService();
  return res.status(200).json(result);
};

exports.ProductListBySemilier = async (req, res) => {};
exports.ProductListByKeywork = async (req, res) => {};
exports.ProductReviewList = async (req, res) => {};
exports.ProductListByRemark = async (req, res) => {};
exports.ProductDetails = async (req, res) => {};
exports.CreateProductReview = async (req, res) => {};
