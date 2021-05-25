const customer = require("../models/customerModel");
const user = require("../models/userModel");
exports.getCustomers = async(req,res)=>{
    res.json(res.pagination);
};
exports.editCustomer=async(req,res)=>{
    const {phoneNumber,username,email,id} = req.body
    if(phoneNumber){
        await customer.findOneAndUpdate({_id:req.params.id},{phoneNumber}).populate('users')
    }
    if(username||email){
        const reponse=await user.findOne({_id:id});
        if(username!=reponse.username){
            reponse.username = username;
        }
        if(email!=reponse.email){
            reponse.email =email
        }
        reponse.save();
    }
    res.json(await customer.findOne({_id:req.params.id}).populate('users'))
}
exports.getCustomer = async(req,res)=>{
    await customer.findOne({_id:req.params.id}).populate('users').then(result=>{
        res.status(200).json(result);
    }).catch(err=>res.json(err));
}
exports.deleteCustomer = async(req,res)=>{  
    const acustomer=await customer.deleteOne({_id:req.params.id}).then(result=>console.log(result)).catch(err=>console.log(err));
    const auser=await user.deleteOne({_id:req.body.id}).then(result=>console.log(result)).catch(err=>console.log(err));
    console.log(auser,acustomer);
    res.json({delete:"successful"})
}