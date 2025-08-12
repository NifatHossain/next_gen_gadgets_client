const { get } = require("mongoose");
const Product = require("../models/product.model");

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const addProduct = async (req, res) => {
  try {
    const { productName, brandName, price, productStock, description, imageURL, category } = req.body;
    console.log("Received product data:", req.body);

    if (!productName || !brandName || !price || !productStock || !description || !imageURL || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const newProduct = await Product.create({
      productName,
      brandName,
      price,
      productStock,
      description,
      imageURL,
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
// @route GET /api/products/category/:categoryName
// @access Public
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Find products where category matches the provided categoryName
    const products = await Product.find({ category: categoryName });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Get a single product by its ID
 * @route GET /api/v1/singleProduct/:productId	
 * @param {string} productId.required - Product ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - Product not found
 */
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Update a single product by its ID
 * @route PATCH /api/v1/updateProduct/:productId	
 * @param {string} productId.required - Product ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - Product not found
 */
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // { new: true } returns the updated document
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/** 
 * @desc Delete a single product by its ID
 * @route DELETE /api/v1/deleteProduct/:productId	
 * @param {string} productId.required - Product ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - Product not found
*/
const deleteSingleProduct = async (req, res) => {
	console.log("Delete single product controller called");
  try {
    const { productId } = req.params;
    console.log("Deleting product with ID:", productId);
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
	const categories = await Product.distinct("category");
	if (!categories || categories.length === 0) {
	  return res.status(404).json({ message: "No categories found" });
	}
	res.status(200).json(categories);
  } catch (error) {
	console.error("Error fetching categories:", error);
	res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
  updateProduct,
  deleteSingleProduct,
  getAllCategories
};
