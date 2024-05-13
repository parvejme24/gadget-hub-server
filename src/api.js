const express = require("express");
const router = express.Router();

// import all router
const routers = [
  require("./routers/ProductRouter"),
  require("./routers/CategoryRouter"),
  require("./routers/BrandRouter"),
  require("./routers/WishlistRouter"),
  require("./routers/ReviewRouter"),
  
];

// dynamically apply routers
routers.forEach((route) => router.use(route));

module.exports = router;
