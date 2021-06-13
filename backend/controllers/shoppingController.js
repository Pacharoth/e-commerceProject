const product = require("../models/productModel.js");
const shoppingModel = require("../models/shoppingCart.js")


exports.postShoppingCart= async (req,res)=>{
    const {customers,data} = req.body;
    const {qty,product} =data;
    const shopping = new shoppingModel({
        users:customers,
        quantity:qty,
        products:product._id,
        sellers:product.sellers._id,
    })
    try{
        await shopping.save();
        res.json({save:"save"});
    }catch(err){
        console.log(err);
        res.json("failed");
    }
}
exports.getShoppingCart= async (req,res)=>{
    console.log("get",req.params.id);
    var result = await shoppingModel.find().populate('products').populate('sellers').populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    });
    var result = result.filter(element=>element.users!==null)
    res.json(result)
}
// sellers:{
//     type: Schema.Types.ObjectId,
//     ref:"sellers",
// },
// customers:{
//     type: Schema.Types.ObjectId,
//     ref:"customers",
// },
// products:{
//     type: Schema.Types.ObjectId,
//     ref:"products",
// },
// quantity:{
//     type:Number,
// }
