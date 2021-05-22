const {Schema,model} = require('mongoose');
const productModel = new Schema({
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'categories',
    },
    sellerId:{
        type:Schema.Types.ObjectId,
        ref:'sellers'
    },
    productName:{
        type:String,
        required:true,
    },
    sizeOrcolor:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    discount:{
        type:Number,
        default:0,
    },
    quantity:{
        type:Number.isInteger(),
        default:0,
    },
    price:{
        type:Number,
        required:true,
    }
})
const product = model("products",productModel);
module.exports = product