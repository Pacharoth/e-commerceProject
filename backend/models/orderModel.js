const {model,Schema}= require('mongoose');
const orderModel = new Schema({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'customers',
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:'products',
    },
    orderDate:{
        type:Date,
        required:true,
    },
    requiredDate:{
        type:Date,
        required:true,
    },
    shippedDate:{
        type:Date,
    },
    quantityOrder:{
        type:Number.isInteger(),
        required:true
    },
    status:{
        type:String,
        default:"unread",
    }
});
const order= model('orders',orderModel);
module.exports = order;