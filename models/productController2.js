const product = require('./models/productModel');

module.exports = {
    home:async (req, res) => {
        const products = await product.find();
        res.render("index", { products });
    }
};