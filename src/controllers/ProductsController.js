const ProductsModel = require("../models/ProductsModel");

// Create new product
exports.CreateProduct = (req, res) => {
  let product = req.body;
  ProductsModel.createOne(product, (err, data) => {
    if (err) {
      return res.status(400).json({ status: "fail", error: err });
    }
    res.status(201).json({ status: "success", data: data });
  });
};

// Read products
exports.ReadProduct = (req, res) => {
  let query = {};
  let projection = { productName: 1, price: 1, description: 1, discount: 1 };
  ProductsModel.find(query, projection, (err, data) => {
    if (err) {
      return res.status(400).json({ status: "fail", error: err });
    }
    res.status(200).json({ status: "success", data: data });
  });
};

// Update product
exports.UpdateProduct = (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  let updatedProduct = req.body;
  ProductsModel.updateOne(query, updatedProduct, (err, data) => {
    if (err) {
      return res.status(400).json({ status: "fail", error: err });
    }
    res.status(200).json({ status: "success", data: data });
  });
};

// Delete product
exports.DeleteProduct = (req, res) => {
  let id = req.params.id;
  let query = { _id: id };
  ProductsModel.deleteOne(query, (err, data) => {
    if (err) {
      return res.status(400).json({ status: "fail", error: err });
    }
    res.status(200).json({ status: "success", data: data });
  });
};
