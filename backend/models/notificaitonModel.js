const {Schema,model} = require('mongoose');
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
const notification = model('notifications',notificationModel);
module.exports = notification;