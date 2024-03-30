const express = require("express");
const productRouter = express.Router();

// import controller
const ProductController = require("../controllers/ProductsController");

// define product controller
productRouter.get("/ProductBrandList", ProductController.ProductBrandList);
productRouter.get(
  "/ProductCategoryList",
  ProductController.ProductCategoryList
);
productRouter.get("/ProductSliderList", ProductController.ProductSliderList);
productRouter.get(
  "/ProductListByBrand/:BrandID",
  ProductController.ProductListByBrand
);
productRouter.get(
  "/ProductListBySemilier/:Keyword",
  ProductController.ProductListBySemilier
);
productRouter.get(
  "/ProductListByKeywork/:Keyword",
  ProductController.ProductListByKeywork
);
productRouter.get(
  "/ProductReviewList/:ProductID",
  ProductController.ProductReviewList
);
productRouter.get(
  "/ProductListByRemark/:Remark",
  ProductController.ProductListByRemark
);
productRouter.get(
  "/ProductDetails/:ProductID",
  ProductController.ProductDetails
);
productRouter.get(
  "/CreateProductReview",
  ProductController.CreateProductReview
);

module.exports = productRouter;
