const role = require('../models/roleModel');
const seller = require('../models/sellerModel');
const user = require('../models/userModel')
exports.registerSeller = async(req,res)=>{
    console.log(req.body)   
    const {company,contact,address,email,_id}= req.body;
    const auser = await seller.find({users:_id});
    const newSeller =await user.find({email:email});
    if(auser.length<=0){
        const aseller = new seller({
            users:_id,
            company,
            contact,
            address,
        })
        await aseller.save()
        const newRole =await role.findOne({name:"seller"})
        newSeller[0].roles=newRole._id;
        console.log(newSeller);
        await newSeller[0].save();
        res.json(await seller.find({_id:aseller._id}).populate('users'));
    }else{
        res.json({result:"User already exists"});
    }
}
exports.getSellers = async(req,res)=>{
    res.json(res.pagination);
}
exports.getSeller = async(req,res)=>{
    var sell  = await seller.find().populate({
        path:'users',
        match:{
            _id:req.params.id,
        }
    })
    var sell = sell.filter(element=>element.users!==null);
    res.json(sell);
}