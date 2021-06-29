const orderModel = require('../models/orderModel');
const shoppingModel = require('../models/shoppingCart');
const productModel =require('../models/productModel');
exports.postPastOrder = async(req,res)=>{

}
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
        order.product.push(
            {
                sellers:data[i].sellers._id,
                products:data[i].products._id,
                quantity:data[i].quantity,
            }
        )
        try{
            await order.save();
            shoppingOrproduct = await shoppingModel.deleteMany({users:users._id,status:"checked"})
            console.log("success");
            res.json(order);
        }catch(error){
            console.log(error);
            res.json({err:true})
        }
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
    console.log(pastorder);     
    res.json(pastorder);
}
exports.getOrder = async(req,res)=>{
    var customerOrder = await orderModel.find().populate('user').populate(
        {
            path:"product",
            populate:[
                {
                    path:'sellers',
                    match:{
                        _id:req.params.id,
                    }
                },
                {
                    path:'products'
                }
            ]
        }
    )
    customerOrder = customerOrder.filter(element=>{
        element=element.product.filter(e=>e.sellers!=null);
    })
    res.json(customerOrder);
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
