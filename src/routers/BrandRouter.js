const express = require("express");
const brandRouter = express.Router();

// import controller
const {
  addBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
  getBrandByBrandName,
} = require("../controllers/BrandController");

// define product controller
brandRouter.post("/brands", addBrand);
brandRouter.get("/brands", getAllBrand);
brandRouter.get("/brands/:id", getBrandById);
brandRouter.get("/brands/:brandName", getBrandByBrandName);
brandRouter.put("/brands/u/:id", updateBrand);
brandRouter.delete("/brands/d/:id", deleteBrand);

// export products routers
module.exports = brandRouter;
