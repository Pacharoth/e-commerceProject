const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const customerModel = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    contact:{
        type:String,
        required:true,
    },
});
const customer = mongoose.model('customers',customerModel);
module.exports = customer;