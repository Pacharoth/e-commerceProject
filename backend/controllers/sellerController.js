const bcrypt = require('bcrypt');
const role = require('../models/roleModel');
const seller = require('../models/sellerModel');
const fs  = require('fs');
const user = require('../models/userModel');
const order = require('../models/orderModel');
const { registerUser } = require('../utils/registerUser');
const paymentModel = require('../models/paymentModel');
exports.registerSeller = async(req,res)=>{
    // console.log(req.body)   
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
        // console.log(newSeller);
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
    // console.log("sellers", sell)
    sell = sell.filter(e=> e.users != null)
    // console.log("not null seller ",sell)
    res.json(sell);
}

exports.changePwd = async (req,res)=>{
    var salt = bcrypt.genSaltSync(10);
    // console.log('change req', req.body)
    var sell = await seller.find().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    })  
    sell = sell.filter(e=> e.users !== null)  
    // console.log('sell',sell)
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
function calIncome(orders){
    let numOrder = orders.length
    let saleUnit = 0
    let totalIncome=0
    let totalProfit =0
    for(let i=0;i<numOrder;i++){
        for(let k =0;k<orders[i].product.length;k++){
            saleUnit = saleUnit + orders[i].product[k].quantity
        }
        
        for(let j=0;j<orders[i].product.length;j++){
            let income=0
            let profit=0
            income = orders[i].product[j].products.price*orders[i].product[j].quantity
            profit = income - orders[i].product[j].products.buyPrice*orders[i].product[j].quantity
            totalIncome = totalIncome + income
            totalProfit = totalProfit + profit
        }
    }
    return {totalSale:saleUnit, totalEarn:totalIncome, totalProfit:totalProfit}

}
exports.getSaleInfo = async (req,res)=>{
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
    });
    // console.log(orders);
    for(let i=0;i<orders.length;i++){
        orders[i].product = orders[i].product.filter(p => p.sellers.users !==null)
    }
    orders = orders.filter(o=> o.product.length!=0)
    const current = new Date()
    var todayOrders = orders.filter(e => (e.orderDate.getDate()== current.getDate() && e.orderDate.getMonth()==current.getMonth() && e.orderDate.getFullYear()==current.getFullYear()))
    // console.log("order daily", todayOrders)
    var r={totalEarn:0,totalSale:0,totalProfit:0,totalY:0,seller:""}
    if(todayOrders.length!=0){
        r = calIncome(todayOrders)
    }
    orders = orders.filter(e=> e.orderDate.getFullYear()==current.getFullYear())
    if(orders.length !=0){
        let y = calIncome(orders)
        r.totalY=y.totalProfit
        r.seller = orders[0].product[0].sellers.company
    }
    
    
    
    res.json({saleUnit:r.totalSale,totalEarn:r.totalEarn, totalPro:r.totalProfit, yearPro:r.totalY, seller: r.seller, reportDate:new Date(), type:"d"})
    // res.json(orders)

}

exports.getMonthlySale= async (req,res)=>{
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
    for(let i=0;i<orders.length;i++){
        orders[i].product = orders[i].product.filter(p => p.sellers.users !==null)
    }
    orders = orders.filter(o=> o.product.length!=0)
    const current = new Date()
    var thisMonth = orders.filter(e => (e.orderDate.getMonth()==current.getMonth() && e.orderDate.getFullYear()==current.getFullYear()))
    // console.log("got orders monthly",orders)
    var r={totalEarn:0,totalSale:0,totalProfit:0, totalY:0, seller:""}
    if(thisMonth.length!=0){
        r = calIncome(thisMonth)
        r.seller = thisMonth[0].product[0].sellers.company
    }
    
    orders = orders.filter(e=> e.orderDate.getFullYear()==current.getFullYear())
    if(orders.lenth!=0){
        y = calIncome(orders)
        r.totalY= y.totalProfit
    }
    res.json({saleUnit:r.totalSale,totalEarn:r.totalEarn, totalPro:r.totalProfit, yearPro:r.totalY, seller: r.seller, reportDate:new Date(), type:"m"} )
}
exports.getYearlySale = async (req,res)=>{
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
    for(let i=0;i<orders.length;i++){
        orders[i].product = orders[i].product.filter(p => p.sellers.users !==null)
    }
    orders = orders.filter(o=> o.product.length!=0)
    var current = new Date()
    orders = orders.filter(e=> e.orderDate.getFullYear()==current.getFullYear())
    // console.log("orders yearly", orders)
    var y ={totalSale:0,totalEarn:0,totalProfit:0,seller:""}
    if(orders.length!=0){
        y = calIncome(orders)
        y.seller= orders[0].product[0].sellers.company
    }
    
    // res.json(orders)
    res.json({saleUnit:y.totalSale,totalEarn:y.totalEarn, totalPro:y.totalProfit, yearPro:y.totalProfit, seller: y.seller, reportDate:new Date(), type:"y"})
}
exports.registerSellerPayment=async(req,res)=>{
    await registerUser(req,res,"seller");

}
exports.checkCompany=async(req,res)=>{
    var response= await seller.find({company:req.body.company});
    res.json(response);
}
exports.payAsSeller= async(req,res)=>{
    const {sellers,type,payment} = req.body;
    var date = new Date();
    if(type=="free"){
        date.setDate(date.getDate()+7);
    }else if(type=='month'){
        date.setDate(date.getDate()+30);
    }else if(type=='year'){
        date.setDate(date.getDate()+365+30);
    }
    const paySeller = new paymentModel({
        sellers,
        type,
        payment,
        paymentAt:new Date,
        expiredPayment:date,
    })
    try {
        await paySeller.save();
        res.json({save:true})
    } catch (error) {
        console.log(error);
        res.json({save:false});
    }
}
exports.getPaymentSeller=async(req,res)=>{
    var payseller = await paymentModel.find({sellers:req.params.id}).slice('array',-1);
    var status,dateValid;
    if(payseller.length>0){
        console.log("true")
        var validateDate = new Date();
        var expireDate = new Date(payseller[0].expiredPayment);
        var oneDay = 1000 * 3600 * 24; 
        var Difference_In_Time = expireDate.getTime()- validateDate.getTime();
        var dayValid = Difference_In_Time/oneDay;
        console.log(dayValid)
        if(dayValid>=0){
            console.log("true")
            status="valid";
            dateValid=dayValid;
        }else{
            status="invalid";
        }
    }else{
        payseller[0].status="special";
    } 
    res.json([{data:payseller[0],status:status,dateValid:dateValid}]);
}
