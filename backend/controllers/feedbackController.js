const Feedback = require('../models/feedbackCustomer');

exports.getFeedbacks = async(req, res) => {
  if(req.params.id){
    var result = await Feedback.find().populate({
      path:"products",
      match:{
        _id:req.params.id,
      }
    }).populate("users");
    console.log(result)
    result = result.filter(element=>element.products!==null);
    res.json(result);
  }else{
    res.json([]);
  }
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
      res.json({result:false});
    }
  }catch(err){
    console.log(err);
    res.json({result:false});
  }
}