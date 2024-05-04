const express = require("express");
const categoryRouter = express.Router();

// import controller
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

// define product controller
categoryRouter.post("/categories", addCategory);
categoryRouter.get("/categories", getAllCategories);
categoryRouter.get("/categories/:id", getCategoryById);
categoryRouter.put("/categories/:id", updateCategory);
categoryRouter.delete("/categories/:id", deleteCategory);

// export products routers
module.exports = categoryRouter;
