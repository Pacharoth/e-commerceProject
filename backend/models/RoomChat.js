const {Schema,model} = require('mongoose');
const RoomChat = new Schema({
    users:[{
        type:Schema.Types.ObjectId,
        ref:'users',
    }],
    chat:[{
        type:Schema.Types.ObjectId,
        ref:'chat',
    }]
},{collection:'roomChat'})
const room = model('roomChat',RoomChat);
module.exports = room;