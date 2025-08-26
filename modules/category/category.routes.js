const express = require('express');
const router = express.Router();
const CategoryController = require('./category.controller');
const { uploadSingle } = require('../../shared/middlewares/upload.middleware');

// Category routes
router.post('/', uploadSingle('image'), CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', uploadSingle('image'), CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

// Subcategory routes
router.post('/:id/subcategories', CategoryController.addSubcategory);
router.delete('/:id/subcategories', CategoryController.removeSubcategory);

module.exports = router;
