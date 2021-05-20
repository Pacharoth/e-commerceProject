const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatModel = new Schema({
    users:{
            type:Schema.Types.ObjectId,
            ref:'users',
        }
    ,
    roomChat:{
        type:Schema.Types.ObjectId,
        ref:'roomChat',
    },
    content:{
        type:String,
    },
    chatAt:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:'unread',
    },
});
const chat = mongoose.model('chat',chatModel)
module.exports = chat;
