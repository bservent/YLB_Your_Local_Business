const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: String,
    }
});

module.exports = mongoose.model('Product', productSchema);