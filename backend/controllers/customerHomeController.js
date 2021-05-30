const products = require('../models/productModel');
exports.listProduct = async (req,res)=>{
    const productList = await products.find().populate('categories');
    console.log("constroller "+productList)
    res.json(productList)

}
