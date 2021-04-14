const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        required:true,
    },
    roles:{
        type:String,
        required:true,
    }
},{collection:'user'});
const user = mongoose.model("user",User);
module.exports = user