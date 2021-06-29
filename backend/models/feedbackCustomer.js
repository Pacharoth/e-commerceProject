
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  products:{
    type:Schema.Types.ObjectId,
    ref:"products",
    require:true,
  },
  users: {
    type:Schema.Types.ObjectId,
    ref:"users",
    require:true,
  },
  postedAt: {
    type: Date,
    required: true
  },
  
}, {collection: 'feedback'});

module.exports = mongoose.model('Feedback', feedbackSchema);
