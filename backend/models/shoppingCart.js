const {Schema,model} = require('mongoose')

const shoppingCart = new Schema({
    sellers:{
        type: Schema.Types.ObjectId,
        ref:"sellers",
    },
    customers:{
        type: Schema.Types.ObjectId,
        ref:"customers",
    },
    products:{
        type: Schema.Types.ObjectId,
        ref:"products",
    },
    quantity:{
        type:Number,
    }


});
const shopping = model('shoppingcart',shoppingCart);
module.exports = shopping;