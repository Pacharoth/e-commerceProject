const {model,Schema} = require('mongoose');
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
},{collection:'chat'});
const chat =model('chat',chatModel)
module.exports = chat;
