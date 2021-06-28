const Feedback = require('../models/feedbackCustomer');

exports.getFeedbacks = async(req, res) => {
  var result = await Feedback.find().populate({
    path:"products",
    match:{
      _id:req.body.productid,
    }
  }).populate("users");
  result = result.filter(element=>element.products!==null);
  res.json(result);
}

exports.createFeedback = async(req, res) => {
  try{
    var feedback = new Feedback({
      content:req.body.content,
      users:req.body.userid,
      products:req.body.productid,
      postedAt:req.body.date
    })
    try{  
      await feedback.save();
      res.json({result:true});
    }catch(err){
      console.log(err);
    }
  }catch(err){
    console.log(err);
    res.json({result:false});
  }
}