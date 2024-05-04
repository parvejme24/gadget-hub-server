const express = require("express");
const brandRouter = express.Router();

// import controller
const {
    addBrand,
    getAllBrand,
    getBrandById,
    updateBrand,
    deleteBrand,
  } = require("../controllers/BrandController");

// define product controller
brandRouter.post("/brands", addBrand);
brandRouter.get("/brands", getAllBrand);
brandRouter.get("/brands/:id", getBrandById);
brandRouter.put("/brands/:id", updateBrand);
brandRouter.delete("/brands/:id", deleteBrand);

// export products routers
module.exports = productRouter;
