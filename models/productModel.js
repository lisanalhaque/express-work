const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
        price: Number,
        description: String,
        image: String  // URL to the product image
});

module.exports = mongoose.model('Product', productSchema);