const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const sellerModel = new Schema({
    users:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    company:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    }
});
const seller = mongoose.model('sellers',sellerModel);
module.exports = seller;