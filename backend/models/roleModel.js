const mongoose = require('mongoose')
const Schema = mongoose.Schema
const roleModel = new Schema({
    name:{
        type:String,
        unique:true,
    }
},{collection:"roles"});
const role = mongoose.model("roles",roleModel);
const arrRole = [{name:'admin'},{name:'customer'},{name:'seller'}]
role.insertMany(arrRole).then(result=>console.log(result)).catch(err=>console.log(err));
module.exports = role;
