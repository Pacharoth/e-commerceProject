const bcrypt = require('bcrypt');
const role = require('../models/roleModel');
const seller = require('../models/sellerModel');
const user = require('../models/userModel')
exports.registerSeller = async(req,res)=>{
    console.log(req.body)   
    const {company,contact,address,email,_id}= req.body;
    const auser = await seller.find({users:_id});
    const newSeller =await user.find({email:email});
    if(auser.length<=0){
        const aseller = new seller({
            users:_id,
            company,
            contact,
            address,
        })
        await aseller.save()
        const newRole =await role.findOne({name:"seller"})
        newSeller[0].roles=newRole._id;
        console.log(newSeller);
        await newSeller[0].save();
        res.json(await seller.find({_id:aseller._id}).populate('users'));
    }else{
        res.json({result:"User already exists"});
    }
}
exports.getSellers = async(req,res)=>{    
    res.json(res.pagination);

}
exports.getSellerByID = async (req,res)=>{
    var sell = await seller.findOne().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    })
    res.json(sell);
}

exports.changePwd = async (req,res)=>{
    const salt = bcrypt.genSalt(10);
    console.log('change req', req.body)
    const sell = await seller.findOne().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    })    
    console.log('sell',sell)
    if(sell !=null){
        console.log('req current pwd',req.body.current)
        bcrypt.compare(req.body.current, sell.users.password).then(matched=>{
            console.log('req new pwd',req.body.nw)
            let hashed = bcrypt.hashSync(req.body.nw, salt);
            console.log('hash new pwd', hashed)
            sell.users.password =  hashed
            try {
                sell.save()
                console.log('match change',sell.users.password)
            } catch (error) {
                console.log('err found when save',error)
            }
            return res.status(200).json({message:"Password is changed",err:false});
        
        }).catch(notMatch =>{
                console.log('unmatched',notMatch);
                res.json({message:"Password is not match !",err:true});
        })
        
    }
}