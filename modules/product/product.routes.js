const express = require('express');
const router = express.Router();
const ProductController = require('./product.controller');
const { uploadSingle } = require('../../shared/middlewares/upload.middleware');

// Product routes
router.post('/', uploadSingle('image'), ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/search', ProductController.searchProducts);
router.get('/slider', ProductController.getSliderProducts);
router.get('/discounted', ProductController.getDiscountedProducts);
router.get('/cheapest', ProductController.getCheapestProducts);
router.get('/newest', ProductController.getNewestProducts);
router.get('/category/:categoryId', ProductController.getProductsByCategory);
router.get('/brand/:brandId', ProductController.getProductsByBrand);
router.get('/remark/:remark', ProductController.getProductsByRemark);
router.get('/:id', ProductController.getProductById);
router.put('/:id', uploadSingle('image'), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
