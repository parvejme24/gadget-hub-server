const express = require("express");
const {
  CreateProduct,
  ReadProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/ProductsController");
const productRouter = express.Router();

productRouter.post("/products", CreateProduct);
productRouter.get("/products", ReadProduct);
productRouter.put("/products/:id", UpdateProduct);
productRouter.put("/delete/:id", DeleteProduct);

module.exports = productRouter;
