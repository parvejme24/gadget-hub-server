const BrandModel = require('./brand.model');
const ResponseUtil = require('../../shared/utils/response.util');
const UploadUtil = require('../../shared/utils/upload.util');

class BrandController {
  async createBrand(req, res, next) {
    try {
      const brandData = { ...req.body };
      
      // Handle image upload if file is present
      if (req.file) {
        const uploadResult = await UploadUtil.uploadImage(
          req.file.buffer, 
          'gadget-brust/brands',
          `brand_${Date.now()}`
        );
        
        if (!uploadResult.success) {
          return ResponseUtil.badRequest(res, uploadResult.error);
        }
        
        brandData.brandImg = {
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          assetId: uploadResult.assetId
        };
      }
      
      const brand = new BrandModel(brandData);
      const savedBrand = await brand.save();
      return ResponseUtil.created(res, savedBrand, 'Brand created successfully');
    } catch (error) {
      next(error);
    }
  }

  async getAllBrands(req, res, next) {
    try {
      const brands = await BrandModel.find();
      return ResponseUtil.success(res, brands, 'Brands retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getBrandById(req, res, next) {
    try {
      const brand = await BrandModel.findById(req.params.id);
      if (!brand) {
        return ResponseUtil.notFound(res, 'Brand not found');
      }
      return ResponseUtil.success(res, brand, 'Brand retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateBrand(req, res, next) {
    try {
      const updateData = { ...req.body };
      
      // Handle image upload if file is present
      if (req.file) {
        // Get current brand to check if it has an image
        const currentBrand = await BrandModel.findById(req.params.id);
        if (!currentBrand) {
          return ResponseUtil.notFound(res, 'Brand not found');
        }
        
        // Delete old image if exists
        if (currentBrand.brandImg && currentBrand.brandImg.publicId) {
          await UploadUtil.deleteImage(currentBrand.brandImg.publicId);
        }
        
        // Upload new image
        const uploadResult = await UploadUtil.uploadImage(
          req.file.buffer, 
          'gadget-brust/brands',
          `brand_${Date.now()}`
        );
        
        if (!uploadResult.success) {
          return ResponseUtil.badRequest(res, uploadResult.error);
        }
        
        updateData.brandImg = {
          url: uploadResult.url,
          publicId: uploadResult.publicId,
          assetId: uploadResult.assetId
        };
      }
      
      const brand = await BrandModel.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
      if (!brand) {
        return ResponseUtil.notFound(res, 'Brand not found');
      }
      return ResponseUtil.success(res, brand, 'Brand updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteBrand(req, res, next) {
    try {
      const brand = await BrandModel.findById(req.params.id);
      if (!brand) {
        return ResponseUtil.notFound(res, 'Brand not found');
      }
      
      // Delete image from Cloudinary if exists
      if (brand.brandImg && brand.brandImg.publicId) {
        await UploadUtil.deleteImage(brand.brandImg.publicId);
      }
      
      // Delete brand
      await BrandModel.findByIdAndDelete(req.params.id);
      return ResponseUtil.success(res, null, 'Brand deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BrandController();
