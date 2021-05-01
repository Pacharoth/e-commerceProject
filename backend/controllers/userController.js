const user = require('../models/userModel');
const bcrypt = require('bcrypt');

const { registerUser } = require('../utils/registerUser');
const role = require('../models/roleModel');
exports.login = async(req,res)=>{
    const request = req.body;
    await user.findOne({email:request.email}).populate('roles').exec()
    .then(result=>{
        if(result){
            bcrypt.compare(request.password,result.password).then(
                passwordMatch=>{
                    if(passwordMatch){
                        res.cookie('username',result.username,{expire:3600*24*1000})
                        res.cookie('logged-time',new Date().toISOString(),{expire:3600*1000*24});
                        const roles = result.roles
                        console.log(roles);
                        const [email,userRole,userId,username]=[result.email,roles.name,result._id,result.username]
                        req.session.email=email
                        req.session.userRole=userRole
                        req.session.userId =userId
                        req.session.username =username
                        console.log(req.session)
                        return res.status(200).json(result);
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
    await registerUser(req,res,"customer");
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
exports.getSession = async(req,res)=>{
    if(req.session){
        return res.status(200).json(req.session);
    }
    else{
        console.log(req.session)
        return res.status(400).json({"error":true});
    }
}
exports.getUser=async(req,res)=>{
    await user.find().populate('roles').then(result=>res.json(result));
}
exports.registerAnyRole = async(req,res)=>{
    await registerUser(req,res,req.body.role);

}