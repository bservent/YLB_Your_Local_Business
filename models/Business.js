const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner:{
        type: String,
        required: true
    },
    businessValues: String,
    category: String,
    images: String,
    address :{
        streetNumber: Number,
        streetName: String,
        city : String,
        state: {
            type: String,
            min:2,
            max:2
        }
    },
    contact: {
        type:Number,
        min : 1000000000,
        max : 9999999999
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    }]
},{timestamps:true});


module.exports = mongoose.model('Business', businessSchema);