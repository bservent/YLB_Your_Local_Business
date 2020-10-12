const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String
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
    },
    images: {
        type: String,
    },
    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    }
},{timestamps:true});

module.exports = mongoose.model('Product', productSchema);