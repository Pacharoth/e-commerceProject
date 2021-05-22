const role = require("../models/roleModel")

exports.getRole = async(req,res)=>{
    role.find().then(result=>{
        res.json(result);
    })
}