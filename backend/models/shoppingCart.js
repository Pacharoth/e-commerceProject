const {Schema,model} = require('mongoose')

const shoppingCart = new Schema({
    sellers:{
        type: Schema.Types.ObjectId,
        ref:"sellers",
    },
    users:{
        type: Schema.Types.ObjectId,
        ref:"users",
    },
    products:{
        type: Schema.Types.ObjectId,
        ref:"products",
    },
    quantity:{
        type:Number,
    },
    status:{
        type:String,
        default:"checked",
    }


});
const shopping = model('shoppingcart',shoppingCart);
module.exports = shopping;