const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const customerModel = new Schema({
    users:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    phoneNumber:{
        type:String,
        default:null
    },
});
const customer = mongoose.model('customers',customerModel);
module.exports = customer;