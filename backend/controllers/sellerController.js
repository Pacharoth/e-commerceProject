const seller = require('../models/sellerModel');
const user = require('../models/userModel')
exports.registerSeller = async(req,res)=>{
    const {email,company,contact,address,img}=req.body;
    const responseUser = await user.findOne({email}).poplate('roles');
    const companyName = await seller.findOne({company});
    if(responseUser.length>0){
        if(companyName.length>0){
            res.json({result:"Company's name is already existed.Please change"})
        }else{
            const newSeller = new seller({
                users:responseUser._id,
                company,
                contact,
                address,
            })
            await newSeller.save()
            res.json(await seller.find({_id:newSeller._id}).populate('users'));
        }
    }else{
        res.json({result:"Could not found in User"});
    }
}
exports.getSellers = async(req,res)=>{
    res.json(res.pagination);
}