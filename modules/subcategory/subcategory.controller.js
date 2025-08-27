const SubcategoryModel = require("./subcategory.model");
const CategoryModel = require("../category/category.model");
const UploadUtil = require("../../shared/utils/upload.util");
const ResponseUtil = require("../../shared/utils/response.util");

class SubcategoryController {
  /**
   * Create a new subcategory for a category
   */
  static async createSubcategory(req, res) {
    try {
      const { subCategoryName, category_id } = req.body;

      if (!subCategoryName || !category_id) {
        return ResponseUtil.badRequest(
          res,
          "Subcategory name and category ID are required"
        );
      }

      // Check if category exists
      const category = await CategoryModel.findById(category_id);
      if (!category) {
        return ResponseUtil.notFound(res, "Parent category not found");
      }

      // Check if subcategory with same name exists in this category
      const existingSubcategory = await SubcategoryModel.findOne({
        subCategoryName: { $regex: new RegExp(`^${subCategoryName}$`, "i") },
        category_id,
      });

      if (existingSubcategory) {
        return ResponseUtil.badRequest(
          res,
          "Subcategory with this name already exists in this category"
        );
      }

      // Handle image upload if provided
      let subCategoryImg = {};
      if (req.file) {
        const uploadResult = await UploadUtil.uploadImage(req.file);
        if (uploadResult.success) {
          subCategoryImg = {
            url: uploadResult.url,
            publicId: uploadResult.publicId,
            assetId: uploadResult.assetId,
          };
        }
      }

      const subcategory = new SubcategoryModel({
        subCategoryName,
        subCategoryImg,
        category_id,
      });

      await subcategory.save();

      // Populate category information
      await subcategory.populate("category_id", "categoryName");

      return ResponseUtil.success(
        res,
        subcategory,
        "Subcategory created successfully"
      );
    } catch (error) {
      console.error("Create Subcategory Error:", error);
      return ResponseUtil.error(res, "Failed to create subcategory", 500);
    }
  }

  /**
   * Get all subcategories for a specific category
   */
  static async getSubcategoriesByCategory(req, res) {
    try {
      const { category_id } = req.params;

      if (!category_id) {
        return ResponseUtil.badRequest(res, "Category ID is required");
      }

      // Check if category exists
      const category = await CategoryModel.findById(category_id);
      if (!category) {
        return ResponseUtil.notFound(res, "Category not found");
      }

      const subcategories = await SubcategoryModel.find({ category_id })
        .populate("category_id", "categoryName")
        .sort({ createdAt: -1 });

      return ResponseUtil.success(
        res,
        subcategories,
        "Subcategories retrieved successfully"
      );
    } catch (error) {
      console.error("Get Subcategories By Category Error:", error);
      return ResponseUtil.error(res, "Failed to get subcategories", 500);
    }
  }

  /**
   * Get subcategory by ID
   */
  static async getSubcategoryById(req, res) {
    try {
      const { id } = req.params;

      const subcategory = await SubcategoryModel.findById(id).populate(
        "category_id",
        "categoryName"
      );

      if (!subcategory) {
        return ResponseUtil.notFound(res, "Subcategory not found");
      }

      return ResponseUtil.success(
        res,
        subcategory,
        "Subcategory retrieved successfully"
      );
    } catch (error) {
      console.error("Get Subcategory Error:", error);
      return ResponseUtil.error(res, "Failed to get subcategory", 500);
    }
  }

  /**
   * Update subcategory
   */
  static async updateSubcategory(req, res) {
    try {
      const { id } = req.params;
      const { subCategoryName, category_id } = req.body;

      const subcategory = await SubcategoryModel.findById(id);
      if (!subcategory) {
        return ResponseUtil.notFound(res, "Subcategory not found");
      }

      // Check if category exists if changing category
      if (category_id && category_id !== subcategory.category_id.toString()) {
        const category = await CategoryModel.findById(category_id);
        if (!category) {
          return ResponseUtil.notFound(res, "Parent category not found");
        }
      }

      // Check for duplicate name if changing name
      if (subCategoryName && subCategoryName !== subcategory.subCategoryName) {
        const existingSubcategory = await SubcategoryModel.findOne({
          subCategoryName: { $regex: new RegExp(`^${subCategoryName}$`, "i") },
          category_id: category_id || subcategory.category_id,
          _id: { $ne: id },
        });

        if (existingSubcategory) {
          return ResponseUtil.badRequest(
            res,
            "Subcategory with this name already exists in this category"
          );
        }
      }

      // Handle image upload if new file is provided
      if (req.file) {
        // Delete old image if exists
        if (subcategory.subCategoryImg.publicId) {
          await UploadUtil.deleteImage(subcategory.subCategoryImg.publicId);
        }

        const uploadResult = await UploadUtil.uploadImage(req.file);
        if (uploadResult.success) {
          subcategory.subCategoryImg = {
            url: uploadResult.url,
            publicId: uploadResult.publicId,
            assetId: uploadResult.assetId,
          };
        }
      }

      // Update fields
      if (subCategoryName) subcategory.subCategoryName = subCategoryName;
      if (category_id) subcategory.category_id = category_id;

      await subcategory.save();

      // Populate updated data
      await subcategory.populate("category_id", "categoryName");

      return ResponseUtil.success(
        res,
        subcategory,
        "Subcategory updated successfully"
      );
    } catch (error) {
      console.error("Update Subcategory Error:", error);
      return ResponseUtil.error(res, "Failed to update subcategory", 500);
    }
  }

  /**
   * Delete subcategory
   */
  static async deleteSubcategory(req, res) {
    try {
      const { id } = req.params;

      const subcategory = await SubcategoryModel.findById(id);
      if (!subcategory) {
        return ResponseUtil.notFound(res, "Subcategory not found");
      }

      // Delete image if exists
      if (subcategory.subCategoryImg.publicId) {
        await UploadUtil.deleteImage(subcategory.subCategoryImg.publicId);
      }

      await SubcategoryModel.findByIdAndDelete(id);

      return ResponseUtil.success(
        res,
        null,
        "Subcategory deleted successfully"
      );
    } catch (error) {
      console.error("Delete Subcategory Error:", error);
      return ResponseUtil.error(res, "Failed to delete subcategory", 500);
    }
  }

  /**
   * Get all subcategories (admin function)
   */
  static async getAllSubcategories(req, res) {
    try {
      const subcategories = await SubcategoryModel.find()
        .populate("category_id", "categoryName")
        .sort({ createdAt: -1 });

      return ResponseUtil.success(
        res,
        subcategories,
        "All subcategories retrieved successfully"
      );
    } catch (error) {
      console.error("Get All Subcategories Error:", error);
      return ResponseUtil.error(res, "Failed to get subcategories", 500);
    }
  }
}

module.exports = SubcategoryController;
