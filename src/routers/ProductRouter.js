const express = require("express");
const { getAllProduct } = require("../controllers/ProductsController");
const productRouter = express.Router();

productRouter.get("/products", getAllProduct);

module.exports = productRouter;
