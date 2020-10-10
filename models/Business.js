const mongoose = require('mongoose');
const businessSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    owner:{
        type: String,
        required: true
    },
    businessvalues: String,
    category: String,
    images: String,
    address :[],
    contact: Number,
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    }]
}) 


module.exports = mongoose.model('Business',businessSchema);