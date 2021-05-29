const product = require('../models/productModel');
const categoryModel = require('../models/categoryModel')
const seller = require('../models/sellerModel')
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
            sellers:sellerid,
            qty:qty,
            detail:detail,
            img:filename
        })
        console.log(newProduct);
        const cate = await categoryModel.find({name:category});
        newProduct.categories = cate[0]._id
        await newProduct.save()

        res.json({'message':'New prodcut is created'})
    }else{
        res.json({'message':"Can't create product"})
    }
    // console.log("file",file)
}

//http://localhost:3000/assets/pic.png