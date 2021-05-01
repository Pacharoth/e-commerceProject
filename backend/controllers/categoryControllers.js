const category = require('../models/categoryModel');
const CheckAuth = require('../utils/checkauth');
exports.getCategories = async(req,res)=>{
    const check = new CheckAuth(req);
    // if(check.admin()){
    //     const categories = await category.find();
    //     try{
    //         return res.status(200).json(categories);
    //     }
    //     catch(err){
    //         return res.status(500).json(err);
    //     }
    // }
    // else{
    //     return res.status(403).json({Permission:"denied"});
    // }
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

}