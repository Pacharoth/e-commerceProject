const role = require("../models/roleModel")

exports.getRole = async(req,res)=>{
    await role.find().then(result=>{
        res.json(result);
    })
}
