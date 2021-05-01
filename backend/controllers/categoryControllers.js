const category = require('../models/categoryModel');
const CheckAuth = require('../utils/checkauth');
exports.getCategories = async(req,res)=>{
    const check = new CheckAuth(req);
    check.admin().then(
        async(result)=>{
            const categories = await category.find();
            try{
                return res.status(200).json(categories);
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
    ).catch(err=>res.status(403).json({Permission:"denied"}));
}

exports.postCategory  =async(req,res)=>{
    const checkauth = new CheckAuth(req);
    checkauth.admin().then(async(result)=>{
        const category = new category(
            {
                name:req.body.name,
            }
        )
        await category.save().then(
            resCategory=>res.status(200).json(resCategory)
        ).catch(err=>res.status(500).json(err));
    })
    .catch(err=>res.status(403).json({Permission:"denied"}));
}
exports.editCategory = async(req,res)=>{
    const checkauth = new CheckAuth(req);
    checkauth.admin().then(async(result)=>{
        await category.findById(req.params.id).then(
            result=>{
                result.name = req.body.name;
                result.save().then(resCategory=>res.status(200).json(resCategory))
                .catch(err=>res.status(400).json(err));
            }
        )
    })
    .catch(err=>res.status(403).json({Permission:"Denied"}));
}
