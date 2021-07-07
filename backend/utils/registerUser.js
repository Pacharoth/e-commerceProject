const bcrypt = require('bcrypt');
const customer = require('../models/customerModel');
const role =require('../models/roleModel');
const seller = require('../models/sellerModel');
const user = require('../models/userModel');
exports.registerUser=async(req,res,names)=>{
    const request = req.body
    console.log(request)
    const salt = bcrypt.genSaltSync(10);
    const roles=await role.findOne({name:names});
    const userAccount = new user({
        username:request.username,
        email:request.email,
        password:bcrypt.hashSync(request.password,salt),
        registerAt:new Date,
        roles:roles._id,
    })
    await userAccount.save().then(async(result)=>{
        await user.findById(result._id).populate('roles').exec().then(
            async resultone=>{
                if(names=="customer"){
                    const aCustomer = new customer({
                        users:result._id,   
                    })
                    await aCustomer.save().then(result=>console.log(result)).catch(err=>console.log(err));
                }else {
                    if(names=="seller"){
                        const aSeller = new seller({
                            users:result._id,
                            company:request.company,
                            contact:request.contact,
                            address:request.address
                        })
                        try{
                            await aSeller.save()
                            console.log("sucess")
                            res.json({save:true,aSeller})
                        }catch(err){
                            console.log(err);
                            return {save:false,company:false};
                        }
                    }else if(name=="admin"){
                        res.status(200).json(resultone);
                    }else{
                        return {save:false};
                    }
                }       
                res.status(200).json(resultone)
            }
        ).catch(err=>res.status(500).json(err));
    }).catch(err=>{
        console.log(err)
        return res.status(400).json(err);
    })
}
