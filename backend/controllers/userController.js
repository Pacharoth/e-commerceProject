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
const customer = require('../models/customerModel');
exports.login = async(req,res)=>{
    const request = req.body;
    await user.findOne({email:request.email}).populate('roles').exec()
    .then(result=>{
        if(result){
            bcrypt.compare(request.password,result.password).then(
                async passwordMatch=>{
                    console.log("req pwd: ",request.password)
                    console.log("match: ", passwordMatch)
                    if(passwordMatch){
            
                        res.cookie('username',result.username,{expire:3600*24*1000})
                        res.cookie('logged-time',new Date().toISOString(),{expire:3600*1000*24});
                        const roles = result.roles
                        const [email,userRole,userId,username,img]=[result.email,roles.name,result._id,result.username,result.img]
                        req.session.email=email
                        req.session.userRole=userRole
                        req.session.userId =userId
                        req.session.username =username
                        req.session.img = img
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
                    html:`<h1>Welcome to Amazing Shop</h1>
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
    const salt = bcrypt.genSaltSync(10);
    const response =await user.findOne({_id:req.params.id})

    response.password =  bcrypt.hashSync(req.body.password,salt);
    try{
        await response.save()
        res.json({result:"Password has been reset",err:false});
    }catch(err){
        res.json({result:"cannot reset password",err:true});
    }

}

exports.findUser = async(req,res)=>{
    console.log(req.body)
    const response=await user.find({email:req.body.email});
    res.json(response);
}

exports.findUserById = async (req,res)=>{
    console.log(req.body);
    const response = await user.find({_id:req.params.id});
    res.json(response);
}

exports.getCustomerByID = async (req,res)=>{
    console.log(req.params.id)
    var customers = await customer.find().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    })
    customers = customers.filter(element=>element.users!==null)
    console.log("customer ",customers);
    res.json(customers)
}

exports.updateCustomerByID = async (req, res) => {
    console.log(req.param.id)
    console.log(req.body)
    const {email, username, phoneNumber, password} = req.body
    const acustomer = await customer.findById(req.params._id);
    acustomer.email = email;
    acustomer.username = username;
    acustomer.phoneNumber = phoneNumber;
    acustomer.password = password;
    try{
        await acustomer.save()
        res.json({save:true});
    }catch(err){
        res.json({save:false})
    }
}


