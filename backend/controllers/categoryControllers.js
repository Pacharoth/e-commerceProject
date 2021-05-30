const category = require('../models/categoryModel');

exports.getCategories = async(req,res)=>{

    const categories = await category.find();
    try{
        return res.status(200).json(categories);
    }
    catch(err){
        return res.status(500).json(err);
    }
}

exports.postCategory  =async(req,res)=>{
    const acategory = new category(
        {
            name:req.body.name,
        }
    )
    await acategory.save().then(
        resCategory=>res.status(200).json(resCategory)
    ).catch(err=>res.status(500).json(err));
    
}
exports.editCategory = async(req,res)=>{
    
    await category.findById(req.params.id).then(
        result=>{
            result.name = req.body.name;
            result.save().then(resCategory=>res.status(200).json(resCategory))
            .catch(err=>res.status(400).json(err));
        }
    )
}
exports.deleteCategory = async(req,res)=>{
    await category.findOneAndDelete({_id:req.params.id}).then(result=>{
        res.json({delete:true})
    }).catch(err=>res.json({delete:false}));
}
exports.searchCategory = async(req,res)=>{
    const regex = req.query.name;
    
    await category.find({name:new RegExp(regex)}).then(result=>res.json(result)).catch(err=>res.json(err))
}
