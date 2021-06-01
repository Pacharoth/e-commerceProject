
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  postedAt: {
    type: String,
    required: true
  },
  
}, {collection: 'feedback'});

module.exports = mongoose.model('Feedback', feedbackSchema);
