const Brand = require("../models/BrandModel");

// add new brand
exports.addBrand = async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.josn({ newBrand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all brand
exports.getAllBrand = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json({ brands });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a brand by id
exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a brand by brandName
exports.getBrandByBrandName = async (req, res) => {
  try {
    const { brandName } = req.params;
    const brand = await Brand.findOne({ brandName });
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update brand by id
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBrand) {
      return res.status(404).josn({ message: "Categorys not Found" });
    }
    res.json(updatedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete brand by id
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(deletedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
