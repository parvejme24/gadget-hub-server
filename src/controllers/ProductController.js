const { ProductService } = require("../services/ProductServices");

exports.ProductService = async (req, res) => {
  let result = await ProductService();
  return res.status(200).json(result);
};
