const express = require("express");
const productRouter = express.Router();

// import controller
import ProductController from "../controllers/ProductsController";

// define product controller
productRouter.post("/products", ProductController.ProductBrandList);
productRouter.get("/products", ProductController.ProductCategoryList);
productRouter.get("/products/:id", ProductController.ProductSliderList);
productRouter.get("/products/:id", ProductController.ProductListByBrand);
productRouter.get("/products/:id", ProductController.ProductListBySemilier);
productRouter.get("/products/:id", ProductController.ProductListByKeywork);
productRouter.get("/products/:id", ProductController.ProductReviewList);
productRouter.get("/products/:id", ProductController.ProductListByRemark);
productRouter.get("/products/:id", ProductController.ProductDetails);
productRouter.post("/products/:id", ProductController.CreateProductReview);

module.exports = productRouter;
