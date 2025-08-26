const express = require('express');
const router = express.Router();
const BrandController = require('./brand.controller');
const { uploadSingle } = require('../../shared/middlewares/upload.middleware');

// Brand routes
router.post('/', uploadSingle('image'), BrandController.createBrand);
router.get('/', BrandController.getAllBrands);
router.get('/:id', BrandController.getBrandById);
router.put('/:id', uploadSingle('image'), BrandController.updateBrand);
router.delete('/:id', BrandController.deleteBrand);

module.exports = router;
