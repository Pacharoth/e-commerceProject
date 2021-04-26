const Feedback = require('../models/feedbackCustomer');

exports.createFeedback = (req, res) => {
    console.log('feedback is created')
    
    const text = req.body.text;
    const postAt = new Date.toISOString();
    const customerId = req.body.customerId;
    const status = req.body.status;
    const name = req.body.name;
    
    console.log('status ', status)
    const feedback = new Feedback({
        text: text,
        postAt: postAt,
        customerId: customerId,
        status: status,
        name: name
    });
    feedback.save().then(result => {
        console.log('feedback was created');
        res.json({"message": "success", "data": result});
    }).catch(err => {
        console.log(err);
    })
}