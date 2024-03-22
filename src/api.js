const express = require("express");
const router = express.Router();

// import all router
const routers = [require("./routers/ProductRouter")];

// dynamically apply routers
routers.forEach((route) => router.use(route));

module.exports = router;
