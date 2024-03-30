const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const SliderModel = require("../models/ProductSlidersModel");
const ProductModel = require("../models/ProductsModel");
const ProductDetaailsModel = require("../models/ProductDetailsModel");
const ReviewModel = require("../models/ReviewModel");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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

const ListByBrandService = async (req) => {
  try {
    let brandId = new ObjectId(req.params.brandId);
    let MatchStage = { $match: { brandId: brandId } };
    let JoinWithBrandStage = {
      $lookup: { from: "brands" },
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    };
    let JoinWithCategoryStage = {
      $lookup: { from: "categories" },
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = { $project: { "brand._id": 0, "category._id": 0 } };
    const data = await ProductModel.aggregate({
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    });
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const ListByCategoryService = async (req) => {
  try {
    let categoryId = new ObjectId(req.params.categoryId);
    let MatchStage = { $match: { categoryId: categoryId } };
    let JoinWithBrandStage = {
      $lookup: { from: "brands" },
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    };
    let JoinWithCategoryStage = {
      $lookup: { from: "categories" },
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = { $project: { "brand._id": 0, "category._id": 0 } };
    const data = await ProductModel.aggregate({
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    });
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

const ListByRemarkService = async (req) => {
  try {
    let remark = new ObjectId(req.params.remark);
    let MatchStage = { $match: { remark: remark } };
    let JoinWithBrandStage = {
      $lookup: { from: "brands" },
      localField: "brandId",
      foreignField: "_id",
      as: "brand",
    };
    let JoinWithCategoryStage = {
      $lookup: { from: "categories" },
      localField: "categoryId",
      foreignField: "_id",
      as: "category",
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = { $project: { "brand._id": 0, "category._id": 0 } };
    const data = await ProductModel.aggregate({
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    });
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error }.toString();
  }
};

module.exports = {
  BrandListService,
  CategoryListService,
  SliderListServicee,
  ProductListService,
  ListByBrandService,
  ListByCategoryService,
  ListByRemarkService,
};
