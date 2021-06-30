const {Schema,model} = require('mongoose');
const productModel = new Schema({
    name:{
        type:String,
        required:true,
    },
    sizeOrcolor:{
        type:String,
        
    },
    detail:{
        type:String,
    },
    discount:{
        type:Number,
        default:0,
    },
    qty:{
        type:Number,
        default:0,
    },
    img:[
        {
            type:String,
        }
    ],
    buyPrice:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:0,
    },
    instock:{
        type:Date
    },
    categories:{
        type: Schema.Types.ObjectId,
        ref:'categories'
    },
    sellers:{
        type:Schema.Types.ObjectId,
        ref:'sellers'
    }
})
const product = model("products",productModel);
module.exports = product