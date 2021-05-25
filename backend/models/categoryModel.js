const {model,Schema} = require('mongoose');

const categoryModel = new Schema({
    name:{
        type:String,
        unique: true
    }
},{collection:'categories'});
const category = model("categories",categoryModel);
const arrCategory = [{name:'clothes'},{name:'electronic'},{name:'bag'}]
category.insertMany(arrCategory).then(result=>console.log(result)).catch(()=>console.log("existed"));
module.exports = category;