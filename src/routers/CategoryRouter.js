const express = require("express");
const categoryRouter = express.Router();

// import controller
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryByCategoryName,
} = require("../controllers/CategoryController");

// define product controller
categoryRouter.post("/categories", addCategory);
categoryRouter.get("/categories", getAllCategories);
categoryRouter.get("/categories/:id", getCategoryById);
categoryRouter.get("/categories/:categoryName", getCategoryByCategoryName);
categoryRouter.put("/categories/u/:id", updateCategory);
categoryRouter.delete("/categories/d/:id", deleteCategory);

// export products routers
module.exports = categoryRouter;
