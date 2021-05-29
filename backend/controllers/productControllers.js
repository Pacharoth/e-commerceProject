const product = require('../models/productModel')
exports.postProduct = async(req,res)=>{
    const reqs= req.body
    const arrayPic=[]
<<<<<<< HEAD
    try{
        const reqFile = req.files.img
        // for(const i in reqFile){
            var filename='/public/assets/img/'+reqFile.name;
            var pathSave=__dirname+filename
            await reqFile.mv(pathSave)
            arrayPic.push(filename);
        // }
        console.log(reqFile)
    }catch(e){
        console.log(e);
=======
    const reqFile = req.files.img
    for(const i in reqFile){
        var filename='/assets/img/'+reqFile[i].name;
        var pathSave=__dirname+filename
        await reqFile[i].mv(pathSave)
        arrayPic.push(filename);
>>>>>>> ac19fc72a4d7f57fdb5ed1a0d66922d2aa0eaca0
    }
    
    const product = new product({
        categories:reqs.categoryid,
        sellers:reqs.sellerid,
        productName:reqs.productName,
        sizeOrcolor:null,
        description:reqs.description,
        discount:reqs.discount,
        quantity:reqs.quamtity,
        price:(reqs.price!==null||reqs.price!==undefined)?reqs.price:0,
        img:arrayPic,
    })
    await product.save()
    res.json(await product.populate('categories').populate('sellers').exec())
}
exports.getProducts=async(req,res)=>{
    const reqs = req.body;
    const products = await product.find({sellers:reqs.sellerid}).populate('sellers').populate('categories').exec()
    res.json(products);
}
//http://localhost:3000/assets/pic.png