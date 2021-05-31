const product = require('../models/productModel');
const categoryModel = require('../models/categoryModel')
const seller = require('../models/sellerModel')
exports.getProducts=async(req,res)=>{
    var aseller =await seller.find().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    });
    aseller = aseller.filter(element=>element.users!==null);
    const products = await product.find({sellers:aseller[0].id}).populate('categories')
    console.log('got from db', products);
    res.json(products);

}
exports.postProduct = async (req,res)=>{
    const{productname,price,instock,qty,sellerid,category,detail} = req.body;
    console.log(req.body)
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
        const cate = await categoryModel.find({name:category});
        var aseller = await seller.find().populate({
            path:'users',
            match:{
                _id:sellerid
            }
        })
        aseller = aseller.filter(element=>element.users!==null);
        // console.log(aseller)
        newProduct.sellers = aseller[0]._id;
        newProduct.categories = cate[0]._id;
        console.log('newproduct',newProduct)
        await newProduct.save().then(result =>{console.log('result',result)})
        .catch(err =>{
            console.log('err',err)
        })
        res.json({'message':'New prodcut is created'})
    }else{
        res.json({'message':"Can't create product"})
    }
}
