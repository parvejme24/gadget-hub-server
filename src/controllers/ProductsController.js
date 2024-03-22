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
exports.getAllProduct = async (req, res) => {
  try {
    const products = await ProductsModel.find(); // Fetch all products from the database
    res.json(products); // Send the products as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" }); // Handle any errors
  }
};
