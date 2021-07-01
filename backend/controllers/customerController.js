const customer = require("../models/customerModel");
const user = require("../models/userModel");
const bcrypt = require("bcrypt")
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
exports.listProfileCustomer = async(req,res)=>{
    console.log(req.params.id)
    var acustomer =await customer.find().populate({
        path:"users",
        match:{
            _id:req.params.id
        }
    });
    console.log(acustomer);
    acustomer= acustomer.filter(element=>element.users!==null);
    res.json(acustomer);
}
exports.postProfile = async(req,res)=>{
    var auser =await user.findOne({_id:req.params.id});
    auser.email = req.body.email;
    auser.username =req.body.username;
    try{
        await auser.save();      
    }catch(err){
        res.json({err:true,result:"Can't save to database"});
    }
    var acustomer = await customer.find().populate({
        path:"users",
        match:{
            _id:req.params.id
        }
    });
    acustomer = acustomer.filter(element=>element.users!==null);        //!==compare data type
    acustomer[0].phoneNumber = req.body.phoneNumber;
    res.json(acustomer); 
}

exports.setNewPassword=async(req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    console.log(req.params.id)
    const response =await user.findOne({_id:req.params.id})
    console.log(response);
    if(response._id){
       var passwords= await bcrypt.compare(req.body.current,response.password);
       console.log(passwords);
       if(passwords){
            response.password =  bcrypt.hashSync(req.body.newpassword,salt);
            try{
                await response.save();
                res.json({result:"Password has been reset",err:false});
            }catch(err){
                res.json({result:"cannot reset password",err:true});
            }
       }else{
           res.json({result:"Current Password is not matched",err:false});
       }
    }else{
        res.json({result:"Account doesn't have so please try again later",err:true});
    }
}