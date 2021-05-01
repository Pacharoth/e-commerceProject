const mongoose = require('mongoose');
const Schema = mongoose.Schema
const categoryModel = new Schema({
    name:{
        type:String,
        unique: true
    }
},{collection:'categories'});
const category = mongoose.model("categories",categoryModel);
const arrCategory = [{name:'clothes'},{name:'electronic'},{name:'bag'}]
category.insertMany(arrCategory).then(result=>console.log(result)).catch(err=>console.log("existed"));
module.exports = category;