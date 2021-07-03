const {Schema, model}=require('mongoose');
const paymentModel = new Schema({
    sellers:{
        type:Schema.Types.ObjectId,
        ref:"sellers",
        require:true,
    },
    type:{
        type:String,
        default:"free"
    },
    payment:{
        type:Number,
        require:true,
    },
    paymentAt:{
        type:Date,
        require:true,
    }
})
const payment = model("payment",paymentModel);
module.exports = payment