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
                        const [email,userRole,userId,username]=[result.email,roles.name,result._id,result.username]
                        req.session.email=email
                        req.session.userRole=userRole
                        req.session.userId =userId
                        req.session.username =username
                        console.log(req.session)
                        return res.status(200).json(req.session);
                    }else{
                        res.json({err:"Password Not Matched!",passwordErr:true});
                    }
                }
            )
        }else return res.json({err:"Email is not Found!",emailErr:true});
    }).catch(()=>{
        return res.status(400).json({err:"Err Backend!",emailErr:true});
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
            console.log(result)
            if(result.email){
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
                
                res.status(200).json({send:true})
            }else{
                res.json({account:false})
            }
                
        }
    ).catch(err=>res.json({account:false}))
}
exports.resetPassword = async(req,res)=>{
    const salt = bcrypt.genSalt(10);
    const response =await user.findOne({_id:req.params.id})
    response.password =  bcrypt.hashSync(req.body.password,salt);
    try{
        await response.save()
        res.json({result:"reset password successful"});
    }catch(err){
        res.json({result:"cannot reset password"});
    }

}
exports.findUser = async(req,res)=>{
<<<<<<< HEAD
    await user.findOne({email:req.body.email}).then(result=>{
        if(result){
            res.json(result);
        }
        else{
            res.json(null);
        }
    }).catch(()=>res.json(null))
}
=======
    console.log(req.body)
    const response=await user.find({email:req.body.email});
    res.json(response);
}
exports.findUserById = async (req,res)=>{
    console.log(req.body);
    const response = await user.find({_id:req.params.id});
    res.json(response);
}
>>>>>>> ac19fc72a4d7f57fdb5ed1a0d66922d2aa0eaca0
