const express = require("express");
const wishlistRouter = express.Router();

// import controller
const {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} = require("../controllers/WishlistController");

// add to wishlist router
wishlistRouter.post("/wishlist", addToWishlist);

// get wishliste item router
wishlistRouter.get("/wishlist/:email", getWishlistItems);

// remove wishliste router
wishlistRouter.delete("/wishlist/:id", removeFromWishlist);

// export wishlist routers
exports.default = wishlistRouter;
