const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, getProductsByCategory, getSingleProduct, deleteSingleProduct, updateProduct, getAllCategories } = require("../controllers/product.controller");

/**
 * @route POST /addProduct
 * @group Product - Operations about Products
 * @param {object} body.body.required - Product object
 * @property {string} productName.required - Product name
 * @property {string} brandName.required - Product brand name
 * @property {number} price.required - Product price
 * @property {number} productStock.required - Product stock quantity
 * @property {string} description.required - Product description
 * @property {string} image.required - Product image URL
 * @property {string} category.required - Product category
 * @returns {object} 200 - success response
 * @returns {Error} 400 - Invalid or expired token
 */
router.post("/addProduct", addProduct);

/**
 * @route GET /getAllProducts
 * @group Product - Operations about Products
 * @returns {object} 200 - success response
 * @returns {Error} 404 - User not found
 */
router.get("/getAllProducts", getAllProducts);

/**
 * @route GET /category/:categoryName
 * @param {string} categoryName.required - Category name
 * @description Get products by category name
 * @returns {object} 200 - success response
 * @returns {Error} 404 - User not found
 */
router.get("/category/:categoryName", getProductsByCategory);

/**
 * @route GET /single-product/:productId
 * @param {string} productId.required - Product ID
 * @description Get a single product by its ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - User not found
 */
router.get("/singleProduct/:productId",getSingleProduct);

/**
 * @route PATCH /updateProduct/:productId
 * @param {string} productId.required - Product ID
 * @description Update a single product by its ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - User not found
 */
router.patch("/updateProduct/:productId", updateProduct);

/**	
 * @route DELETE /deleteProduct/:productId
 * @param {string} productId.required - Product ID	
 * @description Delete a single product by its ID
 * @returns {object} 200 - success response
 * @returns {Error} 404 - User not found
 */
router.delete("/deleteProduct/:productId", deleteSingleProduct);

router.get("/allCategories",getAllCategories);

module.exports = router;