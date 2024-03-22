// const ProductsModel = require("../models/ProductsModel");

const ProductsModel = [
  {
    brand: "Apple",
    model: "iPhone 13",
    color: "Midnight",
    storage: "128GB",
    display: {
      size: "6.1 inches",
      resolution: "2532 x 1170 pixels",
    },
    camera: {
      main: "Dual 12 MP",
      front: "12 MP",
    },
    battery: "Non-removable Li-Ion 3095 mAh",
    price: 799,
  },
  {
    brand: "Samsung",
    model: "Galaxy S21 Ultra",
    color: "Phantom Black",
    storage: "256GB",
    display: {
      size: "6.8 inches",
      resolution: "3200 x 1440 pixels",
    },
    camera: {
      main: "Quad 108 MP",
      front: "40 MP",
    },
    battery: "Non-removable Li-Ion 5000 mAh",
    price: 1199,
  },
  {
    brand: "Google",
    model: "Pixel 6 Pro",
    color: "Cloudy White",
    storage: "128GB",
    display: {
      size: "6.7 inches",
      resolution: "1440 x 3120 pixels",
    },
    camera: {
      main: "Triple 50 MP",
      front: "12 MP",
    },
    battery: "Non-removable Li-Po 5000 mAh",
    price: 899,
  },
];

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
