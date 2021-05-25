const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

}, {collection: 'users'});

const user = mongoose.model("users", userSchema);
module.exports = user