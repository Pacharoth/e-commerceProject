const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema =new Schema({
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
        type:Schema.Types.ObjectId,
        ref:'roles',
    }
},{collection:'users'});
const user = mongoose.model("users",userSchema);
module.exports = user