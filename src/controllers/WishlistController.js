const Wishlist = require("../models/WishModel");

// add item/product in wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const newWishlistItem = await Wishlist.create(req.body);
    res.status(201).json({ newWishlistItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get wishlist items by user email
exports.getWishlistItems = async (req, res) => {
  try {
    const { email } = req.params;
    const wishlistItems = await Wishlist.find({ userEmail: email });
    res.status(200).json({ wishlistItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// remove item/product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const removedItem = await Wishlist.findByIdAndRemove(id);
    if (!removedItem) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
