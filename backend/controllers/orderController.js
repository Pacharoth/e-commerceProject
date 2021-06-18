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
            shoppingOrproduct = await shoppingModel.deleteMany({users:users._id})
            console.log("success");
            res.json(order);
        }catch(error){
            console.log(error);
            res.json({err:true})
        }
    }
}
exports.getPastOrder = async(req,res)=>{
    
}
exports.getReceipt = async(req,res)=>{
    const receipt = orderModel.findById(req.params.id).populate('sellers').populate('products').populate('selles').populate('users');
    res.json(receipt);
}