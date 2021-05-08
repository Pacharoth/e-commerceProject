const customer = require("../models/customerModel");
const user = require("../models/userModel");
exports.getCustomers = async(req,res)=>{
    res.json(res.pagination);
};
exports.editCustomer=async(req,res)=>{
    const request = req.body
    await customer.findOne({
        users:req.params.id,
    }).populate('users').populate('roles').exec().then(async(result)=>{
        if(request.phoneNumber)result.phoneNumber=request.phoneNumber;
        if(request.username)result.users.username=request.username;
        if(request.email)result.users.email=request.email;  
        await user.findOne({_id:result.users._id}).then(
            async(aResult)=>{
                console.log(aResult);
                if(request.username)aResult.username=request.username;
                if(request.email)aResult.email=request.email;  
                try{
                    await aResult.save()
                }catch(err){
                    console.log(err);
                }
            }
        ).catch(err=>console.log(err))
        await result.save().then(aResult=>{
            res.json(aResult)
        }).catch(err=>res.status(500).json(err));
    }).catch(err=>res.json(err));
}
exports.getCustomer = async(req,res)=>{
    await customer.findOne({_id:req.params.id}).populate('users').then(result=>{
        res.status(200).json(result);
    }).catch(err=>res.json(err));
}
exports.deleteCustomer = async(req,res)=>{   
    await customer.deleteOne({users:req.params.id}).then(result=>console.log(result)).catch(err=>console.log(err));
    await user.deleteOne({_id:req.params.id}).then(result=>console.log(result)).catch(err=>console.log(err));
    res.json({delete:"successful"})
}