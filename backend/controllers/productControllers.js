const product = require('../models/productModel');
const categoryModel = require('../models/categoryModel')
const seller = require('../models/sellerModel')
const fs = require('fs');
const { findById } = require('../models/sellerModel');
exports.getProducts=async(req,res)=>{
    var aseller =await seller.find().populate({
        path:'users',
        match:{
            _id:req.params.id
        }
    });
    aseller = aseller.filter(element=>element.users!==null);
    const products = await product.find({sellers:aseller[0].id}).populate('categories')
    // console.log('got from db', products);
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
        const cate = await categoryModel.find({name:category});
        var aseller = await seller.find().populate({
            path:'users',
            match:{
                _id:sellerid
            }
        })
        aseller = aseller.filter(element=>element.users!==null);
        console.log(aseller)
        newProduct.sellers = aseller[0]._id;
        newProduct.categories = cate[0]._id;
        await newProduct.save()
        res.json({'message':'New prodcut is created'})
    }else{
        res.json({'message':"Can't create product"})
    }
}
exports.deleteProduct = async(req,res)=>{
    const aproduct = await product.findByIdAndRemove(req.params.id);
    if(aproduct.img.length>0){
        fs.unlinkSync('./public'+aproduct.img[0]);  
        res.json({delete:true});
    }else if(aproduct){
        res.json({delete:false});
    }
}
exports.updateProduct = async(req,res)=>{
    console.log(req.params.id)
    console.log(req.body)
    console.log(req.files);
    const {name,detail,qty,price,discount,instock,category}=req.body
    const aproduct= await product.findById(req.params.id);
    if(req.files!==null){
        var file = req.files.img;
        var filename='/assets/img/'+file.name;
        var pathSave='./public'+filename;
        fs.unlinkSync('./public'+aproduct.img[0]);
        await file.mv(pathSave)
        aproduct.img[0]=filename;
    }
    aproduct.name = name;
    aproduct.detail=detail;
    aproduct.qty=qty;
    aproduct.price=price;
    aproduct.discount = discount;
    aproduct.instock=instock;
    const cate = await categoryModel.findOne({name:category});
    aproduct.categories =cate._id;
    try{
        await aproduct.save()
        res.json({save:true});
    }
    catch(err){
        res.json({save:false})
    }
}
