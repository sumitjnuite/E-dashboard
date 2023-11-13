// here we make schema for users
const mongoose = require('mongoose');

// schema
const  UserSchema = mongoose.Schema(
    {
        name:String,
        email:String,
        password:String
    }
);

// model
module.exports = mongoose.model('users',UserSchema);