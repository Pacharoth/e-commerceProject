const {model,Schema} = require('mongoose'),
categoryModel = new Schema({
    name:{
        type:String,
        unique: true
    }
},{collection:'categories'});
category = model("categories",categoryModel),
arrCategory = [{name:'clothes'},{name:'electronic'},{name:'bag'}];
category.insertMany(arrCategory).then(result=>console.log(result)).catch(()=>console.log("existed"));
module.exports = category;