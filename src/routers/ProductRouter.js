const express = require("express");
const productRouter = express.Router();

// import controller
const {
  getAllProducts,
  addProduct,
  getProductById,
  getProductByTitle,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByBrand,
} = require("../controllers/ProductsController");

// define product controller
productRouter.post("/products", addProduct);
productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProductById);
productRouter.get("/products/:title", getProductByTitle);
productRouter.put("/products/:id", updateProduct);
productRouter.delete("/products/:id", deleteProduct);
productRouter.get("/products/category/:category", getProductsByCategory);
productRouter.get("/products/brand/:brand", getProductsByBrand);

// export products routers
module.exports = productRouter;
