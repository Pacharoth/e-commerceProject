const bcrypt = require('bcrypt');
const role = require('../models/roleModel');
const seller = require('../models/sellerModel');
const fs  = require('fs');
const user = require('../models/userModel');
const order = require('../models/orderModel');
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
    var sell = await seller.find().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    })
    console.log("sellers", sell)
    sell = sell.filter(e=> e.users != null)
    console.log("not null seller ",sell)
    res.json(sell);
}

exports.changePwd = async (req,res)=>{
    var salt = bcrypt.genSaltSync(10);
    console.log('change req', req.body)
    var sell = await seller.find().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    })  
    sell = sell.filter(e=> e.users !== null)  
    console.log('sell',sell)
    if(sell !=null){
        console.log('req current pwd',req.body.current)
        bcrypt.compare(req.body.current, sell[0].users.password).then(async matched=>{
            if(matched){
                console.log('req new pwd',req.body.nw)
                let response=await user.findById(sell[0].users._id)
                response.password =  bcrypt.hashSync(req.body.nw,salt);
                console.log(response.password)
                try {
                    await response.save()
                    console.log('match change',sell[0].users.password)
                    res.json({message:"Password is changed",err:false})
                } catch (error) {
                    console.log('err found when save',error)
                }
            }else{
                console.log("pwd not match")
                res.json({message:"Password is incorrect!",err:true});

            }

        
        }).catch(notMatch =>{
                console.log('unmatched',notMatch);
                res.json({message:"Password is not match !",err:true});
        })
        
    }
}
exports.addProImg = async (req,res)=>{
    const proImg = req.files.proImg
    console.log("req body add img", req.files.proImg)
    var sell = await seller.find().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    }) 
    sell = sell.filter(e=> e.users != null) 
    try{
        fs.unlinkSync('./public'+userSeller.img);

    }catch(err){
        console.log(err);
    }
    if(proImg){
        var filename='/assets/img/profile/'+proImg.name;
        var pathSave='./public'+filename
        await proImg.mv(pathSave)
        let userSeller =await user.findById(sell[0].users._id)
        userSeller.img =filename
        try {
            await userSeller.save()
            console.log('saved proImg',userSeller.img)
            res.json({message:"profile Img is added",img:filename})
        } catch (error) {
            console.log('err is catched found when saving',error)
        }
    }
    
    
    // res.json({message:"proimg arrived server"})
}
exports.getSaleInfo = async (req,res)=>{
    // const sell = await seller.findOne().populate({
    //     path:'users',
    //     match:{
    //         _id:req.params.id
    //     }
    // }).populate({
    //     path:'orders',
    //     match:{sellers:seller._id}
    // }).populate({
    //     path:'products'
    // })
    var orders = await order.find().populate('users').populate({
        path:'product',
        populate:[
            {
                path:'sellers',
                populate:{
                    path:'users',
                    match:{
                        _id:req.params.id,
                    }
                }
            },
            {path:'products'}
        ]
    })
    const current = new Date()
    // orders = orders.filter(e => findElement(e.orderDate.getDate(), current.getDate()) &&
    //                             findElement(e.orderDate.getMonth(), current.getMonth()) &&
    //                             findElement(e.orderDate.getFullYear(), current.getFullYear()))

    orders = orders.filter(e => (e.orderDate.getDate()== current.getDate() && e.orderDate.getMonth()==current.getMonth() && e.orderDate.getFullYear()==current.getFullYear()))
    console.log("got orders ",orders)
    let numOrder = orders.length
    let saleUnit = 0
    let income=0
    for(let i=0;i<numOrder;i++){
        saleUnit = saleUnit + orders[i].product.length
        for(let j=0;j<orders[i].product.length;j++){
            income = income + (orders[i].product[j].products.price*orders[i].product[j].quantity)
        }
    }
    res.json({saleUnit:saleUnit,totalEarn:income})
    // res.json(orders)

}