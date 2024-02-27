const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// product related apis
router.get("/products", ProductController.ProductService);

module.exports = router;
