const {model,Schema}= require('mongoose');
const orderModel = new Schema({
    users:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },
    product:[
        {
            sellers:{
                type:Schema.Types.ObjectId,
                ref:'sellers'
            },
            products:{
                type:Schema.Types.ObjectId,
                ref:'products',
            },
            quantity:{
                type:Number,
            },
        },
    ],
    orderDate:{
        type:Date,
        required:true,
    },
    requiredDate:{
        type:Date,
    },
    shippedDate:{
        type:Date,
    },
    status:{
        type:String,
        default:"ordering",
    }
});
const order= model('orders',orderModel);
module.exports = order;