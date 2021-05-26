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
        console.log(reponse)
        if(username!=reponse.username){
            reponse.username = username;
        }
        if(email!=reponse.email){
            reponse.email =email
        }
        try{
            await reponse.save();
        }
        catch{
            res.json({err:"Email or Username Already Exists"});
        }
    }
    res.json(await customer.find({_id:req.params.id}).populate('users'))
}
exports.getCustomer = async(req,res)=>{
    await customer.findOne({_id:req.params.id}).populate('users').then(result=>{
        res.status(200).json(result);
    }).catch(err=>res.json(err));
}
exports.deleteCustomer = async(req,res)=>{  
    console.log(req.body)
    const acustomer =await customer.findOneAndDelete({_id:req.params.id});
    console.log(acustomer.users)
    const auser =await user.findOneAndDelete({_id:acustomer.users})
    res.json({delete:"successful"})
}