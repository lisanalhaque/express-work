const mongoose = require('mongoose');// Importing mongoose


// Defining the Product schema
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
        price: Number,
        description: String,
        image: String  // URL to the product image
});

// Exporting the Product model
module.exports = mongoose.model('Product', productSchema);