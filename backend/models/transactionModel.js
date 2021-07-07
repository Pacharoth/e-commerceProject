import {Schema,model} from 'mongoose';
const transactionModel = new Schema({
    sellers:{
        type:Schema.Types.ObjectId,
        ref:"sellers"
    },
    price:{
        type:Number,
        require:true
    }

})