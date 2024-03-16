const ProductsModel = require("../models/ProductsModel");

// create new product
exports.createProduct = (req, res) => {
  const product = req.body;
  ProductsModel.create(product, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", dataa: data });
    }
  });
};

// get all product
exports.getProduct = (req, res) => {
    ProductsModel.find()
};
