const mongoose = require('mongoose');
const Schema = mongoose.Schema
const categoryModel = new Schema({
    name:{
        type:String,
        required:true,
    }
});
const category = mongoose.model("categories",categoryModel);
const arrCategory = [{name:'electronic'},{name:'clothes'},{name:'electronic'},{name:'bag'}]
category.insertMany(arrCategory).then(result=>console.log(result)).catch(err=>console.log("existed"));
module.exports = category;