//role will represent customer, seller or admin
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Role = new Schema({
    name: {
        type: String,
        uniqure: true,
    },
}, {collection: "roles"});

const role = mongoose.model("roles", Role);
const arrRole = [{name: 'admin'}, {name: 'customer'}, {name:'seller'}]
role.insertMany(arrRole).then(result=>console.log(result)).catch(err=>console.log("existed"))
module.exports = role;
