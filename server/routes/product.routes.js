const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, getProductsByCategory, getSingleProduct, deleteSingleProduct, updateProduct, getAllCategories, searchProducts } = require("../controllers/product.controller");

/**
 * @route POST /addProduct
 * @group Product - Operations about Products
 * @security JWT
 * @param {object} body.body.required - Product object
 * @property {string} productName.required - Product name
 * @property {string} brandName.required - Product brand name
 * @property {number} price.required - Product price
 * @property {number} productStock.required - Product stock quantity
 * @property {string} description.required - Product description
 * @property {string} imageURL.required - Product image URL
 * @property {string} category.required - Product category
 * @returns {object} 201 - success response
 * @returns {Error} 400 - Invalid data
 */
router.post("/addProduct", addProduct);

/**
 * @route GET /getAllProducts
 * @group Product - Operations about Products
 * @returns {object} 200 - success response
 * @returns {Error} 500 - Server error
 */
router.get("/getAllProducts", getAllProducts);

/**
 * @route GET /category/:categoryName
 * @group Product - Operations about Products
 * @param {string} categoryName.path.required - Category name
 * @returns {object} 200 - success response
 * @returns {Error} 404 - No products found
 */
router.get("/category/:categoryName", getProductsByCategory);

/**
 * @route GET /singleProduct/:productId
 * @group Product - Operations about Products
 * @param {string} productId.path.required - Product ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - Product not found
 */
router.get("/singleProduct/:productId", getSingleProduct);

/**
 * @route PATCH /updateProduct/:productId
 * @group Product - Operations about Products
 * @security JWT
 * @param {string} productId.path.required - Product ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - Product not found
 */
router.patch("/updateProduct/:productId", updateProduct);

/**
 * @route DELETE /deleteProduct/:productId
 * @group Product - Operations about Products
 * @security JWT
 * @param {string} productId.path.required - Product ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - Product not found
 */
router.delete("/deleteProduct/:productId", deleteSingleProduct);

/**
 * @route GET /search
 * @group Product - Operations about Products
 * @param {string} query.query - Search query for product name
 * @param {string} sortBy.query - Sort by field (price, name)
 * @param {string} sortOrder.query - Sort order (asc, desc)
 * @returns {object} 200 - success response
 * @returns {Error} 404 - No products found
 */
router.get("/search", searchProducts);

/**
 * @route GET /all-categories
 * @group Product - Operations about Products
 * @returns {object} 200 - success response
 * @returns {Error} 500 - Server error
 */
router.get("/all-categories", getAllCategories);

module.exports = router;