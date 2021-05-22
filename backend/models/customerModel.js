const {model,Schema} = require('mongoose')
const customerModel = new Schema({
    users:{
        type:Schema.Types.ObjectId,
        ref:'users',
        unique:true
    },
    phoneNumber:{
        type:String,
        default:null
    },
});
const customer = model('customers',customerModel);
module.exports = customer;