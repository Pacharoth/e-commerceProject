const product = require('../models/productModel');
const categoryModel = require('../models/categoryModel')
const seller = require('../models/sellerModel')
exports.getProducts=async(req,res)=>{
    const products = await product.find({sellers:req.params.id}).populate('categories')
    console.log('got from db', products)
    res.json(products);

}
exports.postProduct = async (req,res)=>{
    const{productname,price,instock,qty,sellerid,category,detail} = req.body;
    const file = req.files.file
    
    if(file){
        var filename='/assets/img/'+file.name;
        var pathSave='./public'+filename
        await file.mv(pathSave)
        const newProduct = new product({
            name:productname,
            price: price,
            instock:instock,
            qty:qty,
            detail:detail,
            img:filename
        })
        console.log(newProduct);
        const cate = await categoryModel.find({name:category});
        const aseller = await seller.find().populate({
            path:'users',
            match:{
                _id:sellerid
            }
        })
        aseller = aseller.filter(element=>element.users!==null);
        newProduct.sellers = aseller[0]._id;
        newProduct.categories = cate[0]._id;
        await newProduct.save()
        res.json({'message':'New prodcut is created'})
    }else{
        res.json({'message':"Can't create product"})
    }
}
