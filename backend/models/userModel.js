const {model,Schema}= require("mongoose");
const userSchema = new Schema({
    roles: {
        type: Schema.Types.ObjectId,
        ref: 'roles',
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registerAt: {
        type: String,
        required: true
    }, 
    img:{
        type:String,
        default:"",
    }

}, {collection: 'users'});

const user = model("users", userSchema);
module.exports = user