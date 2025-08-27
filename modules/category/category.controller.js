const CategoryModel = require("./category.model");
const ResponseUtil = require("../../shared/utils/response.util");
const UploadUtil = require("../../shared/utils/upload.util");

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const categoryData = { ...req.body };

      // Handle image upload if file is present
      if (req.file) {
        const uploadResult = await UploadUtil.uploadImage(
          req.file.buffer,
          "gadget-brust/categories",
          `category_${Date.now()}`
        );

        if (!uploadResult.success) {
          return ResponseUtil.badRequest(res, uploadResult.error);
        }

        categoryData.categoryImg = {
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          assetId: uploadResult.assetId,
        };
      }

      const category = new CategoryModel(categoryData);
      const savedCategory = await category.save();
      return ResponseUtil.created(
        res,
        savedCategory,
        "Category created successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async getAllCategories(req, res, next) {
    try {
      const categories = await CategoryModel.find();
      return ResponseUtil.success(
        res,
        categories,
        "Categories retrieved successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const category = await CategoryModel.findById(req.params.id);
      if (!category) {
        return ResponseUtil.notFound(res, "Category not found");
      }
      return ResponseUtil.success(
        res,
        category,
        "Category retrieved successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const updateData = { ...req.body };

      // Handle image upload if file is present
      if (req.file) {
        // Get current category to check if it has an image
        const currentCategory = await CategoryModel.findById(req.params.id);
        if (!currentCategory) {
          return ResponseUtil.notFound(res, "Category not found");
        }

        // Delete old image if exists
        if (
          currentCategory.categoryImg &&
          currentCategory.categoryImg.publicId
        ) {
          await UploadUtil.deleteImage(currentCategory.categoryImg.publicId);
        }

        // Upload new image
        const uploadResult = await UploadUtil.uploadImage(
          req.file.buffer,
          "gadget-brust/categories",
          `category_${Date.now()}`
        );

        if (!uploadResult.success) {
          return ResponseUtil.badRequest(res, uploadResult.error);
        }

        updateData.categoryImg = {
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          assetId: uploadResult.assetId,
        };
      }

      const category = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!category) {
        return ResponseUtil.notFound(res, "Category not found");
      }
      return ResponseUtil.success(
        res,
        category,
        "Category updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      const category = await CategoryModel.findById(req.params.id);
      if (!category) {
        return ResponseUtil.notFound(res, "Category not found");
      }

      // Delete image from Cloudinary if exists
      if (category.categoryImg && category.categoryImg.publicId) {
        await UploadUtil.deleteImage(category.categoryImg.publicId);
      }

      // Delete category
      await CategoryModel.findByIdAndDelete(req.params.id);
      return ResponseUtil.success(res, null, "Category deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
