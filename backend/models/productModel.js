const {Schema,model} = require('mongoose');
const productModel = new Schema({
    // categories:{
    //     type:Schema.Types.ObjectId,
    //     ref:'categories',
    // },
    // sellers:{
    //     type:Schema.Types.ObjectId,
    //     ref:'sellers'
    // },
    productName:{
        type:String,
        required:true,
    },
    sizeOrcolor:{
        type:String,
        
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
    img:[
        {
            type:String,
        }
    ],
    price:{
        type:Number,
        default:0,
    }
})
const product = model("products",productModel);
module.exports = product