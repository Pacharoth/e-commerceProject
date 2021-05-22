const {Schema,model} = require('mongoose');

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

module.exports = model('Feedback', feedbackSchema);