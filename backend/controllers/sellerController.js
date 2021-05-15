const seller = require('../models/sellerModel');
const userModel = require('../models/userModel');
exports.registerSeller = async(req,res)=>{
    const {email,company,contact,address,img}=req.body;
    if(req.session.roles=="admin"){
        await userModel.findOne({email:email}).then(async(result)=>{
            if(result){
                const aSeller = new seller({
                    users:result._id,
                    company,
                    contact,
                    address,
                    img,
                })
                await aSeller.save().then(result=>res.status(200).json({register:"successful"}))
                .catch(err=>res.status(500).json(err));
            }
        }).catch(result=>res.status(400).json({notfound:true}))
    }
}