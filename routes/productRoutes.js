const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController2 = require("../controllers/productController2");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");        // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);     // Unique filename
  }
});
const upload = multer({ storage: storage });        // Multer instance

//routes
router.get("/", productController2.home);
router.get("/add", productController2.addform);
router.post("/add", upload.single("image"), productController2.addproduct);

module.exports = router;


