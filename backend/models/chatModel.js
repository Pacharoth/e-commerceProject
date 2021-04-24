const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const chatModel = new Schema({
    users:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },
    roomId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    }
});
const chat = mongoose.model('chat',chatModel)
module.exports = chat;