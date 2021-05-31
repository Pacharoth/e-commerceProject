//role will represent customer, seller or admin
const {model,Schema} = require('mongoose');
const Role = new Schema({
    name: {
        type: String,
        unique: true
    },
}, {collection: "roles"});

const role = model("roles", Role);
const arrRole = [{name: 'admin'}, {name: 'customer'}, {name:'seller'}]
role.insertMany(arrRole).then(result=>console.log(result)).catch(()=>console.log("existed"))
module.exports = role;
