const Product = require("../models/product.model");
const SuccessResponse = require("../utils/SuccessResponse");
const ErrorResponse = require("../utils/ErrorResponse");

/**
 * @desc    Add a new product
 * @route   POST /api/v1/addProduct
 * @access  Private (Admin)
 */
const addProduct = async (req, res, next) => {
  try {
    const { productName, brandName, price, productStock, description, imageURL, category } = req.body;

    if (!productName || !brandName || !price || !productStock || !description || !imageURL || !category) {
      throw new ErrorResponse("All fields are required", 400);
    }

    if (req.user.role !== "admin") {
      throw new ErrorResponse("Not authorized to add products", 403);
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

    const response = new SuccessResponse("Product added successfully", 201, { product: newProduct });
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/v1/getAllProducts
 * @access  Public
 */
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    const response = new SuccessResponse("Products retrieved successfully", 200, { products });
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get products by category
 * @route   GET /api/v1/category/:categoryName
 * @access  Public
 */
const getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      throw new ErrorResponse("Category name is required", 400);
    }

    const products = await Product.find({ category: categoryName });

    if (products.length === 0) {
      throw new ErrorResponse("No products found for this category", 404);
    }

    const response = new SuccessResponse("Products retrieved successfully", 200, { products });
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/v1/singleProduct/:productId
 * @access  Public
 */
const getSingleProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    const response = new SuccessResponse("Product retrieved successfully", 200, { product });
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a product by ID
 * @route   PATCH /api/v1/updateProduct/:productId
 * @access  Private (Admin)
 */
const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    if (req.user.role !== "admin") {
      throw new ErrorResponse("Not authorized to update products", 403);
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      throw new ErrorResponse("Product not found", 404);
    }

    const response = new SuccessResponse("Product updated successfully", 200, { product: updatedProduct });
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product by ID
 * @route   DELETE /api/v1/deleteProduct/:productId
 * @access  Private (Admin)
 */
const deleteSingleProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (req.user.role !== "admin") {
      throw new ErrorResponse("Not authorized to delete products", 403);
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new ErrorResponse("Product not found", 404);
    }

    const response = new SuccessResponse("Product deleted successfully", 200);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search and filter products
 * @route   GET /api/v1/search
 * @access  Public
 */
const searchProducts = async (req, res, next) => {
  try {
    const { query, sortBy, sortOrder } = req.query;

    // Build the query object
    let searchQuery = {};
    if (query) {
      searchQuery.productName = { $regex: query, $options: "i" }; // Case-insensitive search
    }

    // Build the sort object
    let sortOptions = {};
    if (sortBy === "price") {
      sortOptions.price = sortOrder === "desc" ? -1 : 1;
    } else if (sortBy === "name") {
      sortOptions.productName = sortOrder === "desc" ? -1 : 1;
    }

    const products = await Product.find(searchQuery).sort(sortOptions);

    if (products.length === 0) {
      throw new ErrorResponse("No products found", 404);
    }

    const response = new SuccessResponse("Products retrieved successfully", 200, { products });
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all categories
 * @route   GET /api/v1/all-categories
 * @access  Public
 */
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct("category");
    const response = new SuccessResponse("Categories retrieved successfully", 200, { categories });
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  getSingleProduct,
  updateProduct,
  deleteSingleProduct,
  searchProducts,
  getAllCategories,
};