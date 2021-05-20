const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoomChat = new Schema({
    users:[{
        type:Schema.Types.ObjectId,
        ref:'users',
    }],
},{collection:'roomChat'})
const room = mongoose.model('roomchat',RoomChat);
module.exports = room;