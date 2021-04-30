const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    text:{
        type: String, 
        required: true
    },
    postAt: {       //datetime
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    status: {   //status represent reply 
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {collection: 'feedback'});

module.exports = mongoose.model('Feedback', feedbackSchema);