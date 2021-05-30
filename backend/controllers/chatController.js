const io = require('socket.io');
const user = require('../models/userModel');
exports.chatFile =async(req,res)=>{
    const file = req.files.voice;
    const filePath="/public/assets/voice/"+file.name+".mp3";
    const mvPath =__dirname+filePath
    try{
        file.mv(mvPath);
        io.on('save-chat',{
            roomId:req.body.roomId,
            ownerId:req.body.ownerId,
            content:filePath
        });
        res.json("success");
    }catch(err){
        res.json(err);
    }
}
exports.searchChat =async(req,res)=>{
    const users =await user.find({username:{
        $regex:new RegExp(req.body.user)
    }}).populate('roles').limit(5);
    res.json(users);
}
//select * from people like "%naro%"