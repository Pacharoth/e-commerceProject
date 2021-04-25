const user = require('../models/userModels')
const role =require('../models/roleModel')
const bcrypt = require('bcrypt')

exports.login = async(req,res)=>{
    const request = req.body;
    await user.findOne({email:request.email}).then(result=>{
        if(result){
            bcrypt.compare(request.password,result.password).then(
                passwordMatch=>{
                    if(passwordMatch){
                        res.cookie('username',result.username,{expire:3600*24*1000})
                        res.cookie('logged-time',new Date().toISOString(),{expire:3600*1000*24});
                        req.session={email:result.email,userRole:result.roles,userId:result._id}
                        return req.status(200).json(result);
                    }else{
                        res.json({passwordMatch:false});
                    }
                }
            )
        }else return res.json({user:"Not found"});
    }).catch(err=>{
        return res.status(400).json({user:"Not Found!"});
    })
}
exports.registerCustomer = async(req,res)=>{
    const request = req.body
    const salt = bcrypt.genSaltSync(10);
    const customerAccount = new user({
        username:request.username,
        email:request.email,
        password:bcrypt.hashSync(request.password,salt),
        createAt:new Date,
        roles:role.findOne({name:'customer'}).then(result=>result.id).catch(err=>err),
    });
    await customerAccount.save().then(result=>{
        return res.status(200).json(result);
    }).catch(err=>{
        console.log(err)
        return res.status(400).json(err);
    })
}
exports.logout = async(req,res)=>{
    if(req.session.userId){
        req.session.destroy();
        res.clearCookie('username');
        return res.status(200).json({success:true});
    }else{
        return res.status(400).json({success:false});
    }
}