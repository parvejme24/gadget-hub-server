const express = require('express');
const router = express.Router();
const SubcategoryController = require('./subcategory.controller');
const { uploadSingle } = require('../../shared/middlewares/upload.middleware');

// Get all subcategories (admin function) - must be first to avoid conflicts
router.get('/', SubcategoryController.getAllSubcategories);

// Get subcategories by category
router.get('/category/:category_id', SubcategoryController.getSubcategoriesByCategory);

// Single subcategory operations
router.get('/:id', SubcategoryController.getSubcategoryById);
router.put('/:id', uploadSingle('image'), SubcategoryController.updateSubcategory);
router.delete('/:id', SubcategoryController.deleteSubcategory);

// Create subcategory
router.post('/', uploadSingle('image'), SubcategoryController.createSubcategory);

module.exports = router;
