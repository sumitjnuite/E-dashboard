// here we make schema for users
const mongoose = require('mongoose');

// schema
const  ProductSchema = mongoose.Schema(
    {
        name:String,
        price:String,
        category:String,
        userID:String,
        company:String
    }
);

// model
module.exports = mongoose.model('products',ProductSchema);