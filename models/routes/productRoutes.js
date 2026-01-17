const express = require("express");
const router = express.Router();
const productController2 = require("../productController2");

// Route to display all products on the home page
router.get("/", productController2.home);

module.exports = router;