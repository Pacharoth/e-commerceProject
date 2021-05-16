const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const myemail = "narutonaraku01@gmail.com"
exports.transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:myemail,
        pass:"narutonaraku01@P",
    }
});
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
                        return res.status(200).json(req.session);
                    }else{
                        res.json({passwordMatch:false});
                    }
                }
            )
        }else return res.json({password:"Password Not Matched!"});
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
exports.forgetPassword = async(req,res)=>{
    const header = req.hostname
    const protocol = req.protocol
    await user.findOne({email:req.body.email}).then(
        result=>{
            this.transport.sendMail({
                from:myemail,
                to:req.body.email,
                subject:"Reset Password",
                html:`<h1>Welcome to Awesome</h1>
                    <p>Please click link below to reset password<br></p>
                    <a href="${protocol}://${header}:8080/resetpassword/${result._id}">here</a>`
            }).then(result=>{
                console.log(result);
            }).catch(err=>{
                console.log(error);
            })
            res.status(200).json({send:"failed"})
                
        }
    ).catch(err=>res.status(400).json({Account:"Not found"}))
}
exports.resetPassword = async(req,res)=>{
    const salt = bcrypt.genSalt(10);
    await user.findOne({_id:req.params.id}).then(
        result=>{
            result.password = bcrypt.hashSync(req.body.password,salt);
            result.save().then(
                result=>{
                    res.status(200).json({passwordChange:"success"});
                }
            )
        }
    ).catch(err=>res.status(400).json(err));
}