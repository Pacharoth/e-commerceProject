const orderModel = require('../models/orderModel');
const shoppingModel = require('../models/shoppingCart');
const productModel =require('../models/productModel');
const seller = require('../models/sellerModel');
const userModel = require('../models/userModel');
const customerModel = require('../models/customerModel')
exports.getReceiptCustomer = async(req,res)=>{
    const data = req.body;
    const users = data[0].users;
    var shoppingOrproduct = null;
    const order = new orderModel({
        users,
        orderDate: new Date,
    })
    for(const i in data){
        shoppingOrproduct = await productModel.find({_id:data[i].products._id});
        shoppingOrproduct[0].qty = shoppingOrproduct[0].qty-data[i].quantity;
        try{
            await shoppingOrproduct[0].save();
        }catch(error){
            console.log(error)
            res.json({err:true})
        }
        if(data[i].status=="checked"){
            order.product.push(
                {
                    sellers:data[i].sellers._id,
                    products:data[i].products._id,
                    quantity:data[i].quantity,
                }
            )
        }
        try{
            shoppingOrproduct = await shoppingModel.deleteMany({users:users._id,status:"checked"})
            console.log("success");
        }catch(err){
            console.log(err);
            res.json({err:true})
        }
       
    }
    try{
        await order.save();
        console.log("success");
        res.json(order);
    }catch(error){
        console.log(error);
        res.json({err:true})
    }
}
exports.postBuyNow = async(req,res)=>{
    const data  =req.body
    var {user,quantity,sellers,_id}  =data;
    const order = new orderModel({
        users:user,
        orderDate:new Date,
    })
    var product = await productModel.findById(_id);
    product.qty=product.qty-quantity;
   
    order.product.push({
        sellers:sellers._id,
        products:_id,
        quantity:quantity,
    })
    try {
        await product.save();
        await order.save();
        console.log("success");
        res.json(order);
    } catch (error) {
        console.log(error);
        res.json({err:true})
    }
}
exports.getPastOrder = async(req,res)=>{
    var pastorder = await orderModel.find().populate({
        path:'users',
        match:{
            "_id":req.params.id,
        }
    }).populate({
        path:'product',
        populate:[
            {path:'sellers'},
            {path:'products'}
        ],
    })
    pastorder = pastorder.filter(element=>element.users!=null);
    // console.log(pastorder);     
    res.json(pastorder);
}
exports.getOrder = async(req,res)=>{
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startPoint = (page-1)*limit;
    const endPoint =page * limit;
    var aseller = await seller.findOne({users:req.params.id})
    var customerOrder = await orderModel.find().populate({
        path:'users',
        select:'username email'
    }).populate(
        {
            path:"product",
            populate:[
                {
                    path:'sellers',
                    match:{
                        _id:aseller._id,
                    }
                },
                {
                    path:'products'
                }
            ]
        }
    )
    customerOrder = customerOrder.filter(element=>{
        var p = 0;
        var count=0;
        for(var i of element.product){

            if(i.sellers==null){
                element.product[p]=null;
                count++;
            }
            p++;
        // return element.product!==null;
        }
        if(count==element.product.length){
            element.product=null;
        }
        return element.product!==null;
    })
    const results={};
    if(endPoint < customerOrder.length){
        results.next={
            page:page+1,
            limit:limit,
        } 
    }
    if(startPoint>0){
        results.previous={
            page:page-1,
            limit:limit,
        }
    }
    customerOrder=customerOrder.slice(startPoint,endPoint);
    // customerOrder.result = results;
    // console.log(customerOrder)

    res.json({customerOrder,results});
}
exports.getReceipt = async(req,res)=>{
    const receipt = await orderModel.findOne({_id:req.params.id}).populate('users').populate({
        path:'product',
        populate:[
            {path:'sellers'},
            {path:'products'},
        ],
    })
    res.json(receipt);
}
exports.verifyPhoneNumer = async(req,res)=>{
    var auser=[]
    for (i of req.body){
        console.log(i);
        var ausers = await userModel.findOne({_id:i}).populate('roles');
        if(ausers.roles.name=="seller"){
           var aseller =await seller.find().populate({
               path:'users',
               match:{
                   _id:i
               }
           });
           aseller=aseller.filter(element=>element.users!==null);
           auser.push(aseller[0].contact);
        }else if(ausers.roles.name=="customer"){
            var acustomer = await customerModel.find().populate({
                path:'users',
                match:{
                    _id:i
                }
            });
            acustomer =acustomer.filter(element=>element.users!==null);
            auser.push(acustomer[0].phoneNumber)
        }else{
            auser.push(null);
        }
    }
    console.log(auser)
    res.json(auser)
}