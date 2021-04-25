const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationModel = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
    },
    newfeed:{
        type:String,
    },
    status:{
        type:String,
        default:"unread",
    },
});
const notification = mongoose.model('notifications',notificationModel);
module.exports = notification;