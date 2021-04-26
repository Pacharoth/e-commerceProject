const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    role: {
        type: Schema.Types.ObjectId,
        ref: 'roles',
    }
}, {collection: 'users'});

const user = mongoose.model("users", userSchema);
module.exports = user