const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, getProductsByCategory } = require("../controllers/product.controller");

router.post("/addProduct", addProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/category/:categoryName", getProductsByCategory);

module.exports = router;