const category = require('../models/categoryModel');
const checkauth = require('../utils/checkauth');
var admin=false

exports.getCategories = async(req,res)=>{
    if(checkauth(req)){
        const categories = await category.find();
        try{
            return res.status(200).json(categories);
        }
        catch(err){
            return res.status(500).json(err);
        }
    }else res.status(403).json({PermissionRequest:"denied"})
}

exports.postCategory  =async(req,res)=>{
    if(checkauth(req)){
        const category = new category(
            {
                name:req.body.name,
            }
        )
        await category.save().then(
            resCategory=>res.status(200).json(resCategory)
        ).catch(err=>res.status(500).json(err));
    }
    else res.status(403).json({PermissionRequest:"denied"});
}
exports.editCategory = async(req,res)=>{
    if(checkauth(req)){
        await category.findById(req.params.id).then(
            result=>{
                result.name = req.body.name;
                result.save().then(resCategory=>res.status(200).json(resCategory))
                .catch(err=>res.status(400).json(err));
            }
        )
    }else res.status(403).json({PermissionRequest:"Denied"});
}
