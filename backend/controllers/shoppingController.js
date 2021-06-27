const productModel = require("../models/productModel.js");
const shoppingModel = require("../models/shoppingCart.js")


exports.postShoppingCart= async (req,res)=>{
    const {customers,data} = req.body;
    const {qty,product} =data;
    try{
        var shopping = await shoppingModel.find({products:product._id,users:customers})
        console.log(shopping.length)
        if(shopping.length>0){
            shopping[0].quantity = shopping[0].quantity+qty;
           try{
               await shopping[0].save();
               res.json({save:"save"});
           }catch(err){
               res.json([{err:err},"fail"]);
           }
        }else{
            shopping = new shoppingModel({
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
                res.json([err,"failed"]);
            }
        }
    }catch(e){
        res.json([err,"failed"])
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
exports.updateShopping = async(req,res)=>{
    var shopping = await shoppingModel.findOne({_id:req.params.id});
    if(typeof(req.body.qty)==='number'){
        shopping.quantity = req.body.qty;
    }
    else if(typeof(req.body.qty)==='string'){
        shopping.status = req.body.qty;
        console.log(req.body.qty)
    }
    try{
        await shopping.save();
        res.json({result:true})
    }catch(err){
        console.log(err);
        res.json({result:false})
    }
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
