const io = require('socket.io');
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
