const express = require("express");
const router = express.Router();

// import all router
const routers = [require("./routers/ProductRouter")];

// dynamically apply routers
routers.forEach((router) => router.use(router));

module.exports = router;
