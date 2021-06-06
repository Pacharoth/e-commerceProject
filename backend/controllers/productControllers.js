const product = require('../models/productModel');
const categoryModel = require('../models/categoryModel')
// exports.postProduct = async(req,res)=>{
//     const reqs= req.body
//     const arrayPic=[]
//     const reqFile = req.files.img
//     for(const i in reqFile){
//         var filename='/assets/img/'+reqFile[i].name;
//         var pathSave=__dirname+filename
//         await reqFile[i].mv(pathSave)
//         arrayPic.push(filename);
//     }
    
//     const product = new product({
//         categories:reqs.categoryid,
//         sellers:reqs.sellerid,
//         productName:reqs.productName,
//         sizeOrcolor:null,
//         description:reqs.description,
//         discount:reqs.discount,
//         quantity:reqs.quamtity,
//         price:(reqs.price!==null||reqs.price!==undefined)?reqs.price:0,
//         img:arrayPic,
//     })
//     await product.save()
//     res.json(await product.populate('categories').populate('sellers').exec())
// }
exports.getProducts=async(req,res)=>{
    const reqs = req.body;
    console.log('get product req', reqs)
    const products = await product.find({sellers:reqs.sellerid}).populate('categories').exec()
    res.json(products);
}
exports.postProduct = async (req,res)=>{
    const{productname,price,instock,qty,sellerid,category} = req.body;
    const file = req.files.file
    if(file){
        var filename='/assets/img/'+file.name;
        var pathSave='./public'+filename
        await file.mv(pathSave)
        const newProduct = new product({
            name:productname,
            price: price,
            instock:instock,
            sellers:sellerid,
            qty:qty,
            img:filename
        })
        const cate = await categoryModel.find({name:category});
        newProduct.categories = cate[0]._id
        await newProduct.save()

        res.json({'message':'New prodcut is created'})
    }else{
        res.json({'message':"Can't create product"})
    }
    // console.log("file",file)
}

exports.listProduct = async(req,res) =>{
    const result = await product.find().populate("categories");
    res.json(result);
}

exports.getProByID = async(req,res)=>{
    const result = await product.findById(req.params.id);
    res.json(result);
}

exports.getProInCart = async(req,res)=>{
    const result = await product.findById(req.params.id)
    res.json(result);
}

//http://localhost:3000/assets/pic.png