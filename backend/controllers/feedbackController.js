const Feedback = require('../models/feedbackCustomer');

exports.getFeedbacks = (req, res) => {
  Feedback.find({}, (err, feedbacks) => {
    if(err)
      console.log(err)
    res.json(feedbacks)  
  })
}

exports.createFeedback = (req, res) => {
  const feedback = new Feedback({
    content: req.body.content,
    user: "kong",
    postedAt: "2021-05-18",
   // postedAt: new Date().toISOString()
  })
  feedback.save().then(result => {
    console.log('feedback is created')
    res.json({ "message": "New feedback was created.", "data": result });
  }).catch(err => {
    console.log(err);
  })
}