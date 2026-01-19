const product = require('../models/productModel');

module.exports = {
    home:async (req, res) => {
        const products = await product.find();
        res.render("index2", { products });
    },
    addform: (req, res) => {
        res.render("add-product");
    },
    addproduct: async (req, res) => {
        const { name, price, description } = req.body;
        const image = req.file?req.file.filename:null;
        await product.create({ name, price, description, image });
        res.redirect("/product");
    },
};