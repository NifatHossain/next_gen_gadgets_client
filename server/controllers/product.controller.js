const Product = require("../models/Product");

// @desc Add new product
// @route POST /api/products
// @access Public (change to Private if using auth)
const addProduct = async (req, res) => {
  try {
    const { productName, price, description, image, category } = req.body;
	console.log("Received product data:", req.body);
    if (!productName || !price || !description || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const newProduct = await Product.create({
      productName,
      price,
      description,
      image,
      category,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all products
// @route GET /api/products
// @access Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get products by category
// @route GET /api/products/category/:categoryId
// @access Public
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({ category: categoryId }).populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsByCategory,
};
