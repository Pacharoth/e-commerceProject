const room=require("../models/RoomChat");
const chat =require('../models/chatModel');
const chatData = (io,socket)=>{
    socket.on('get-chat',async data=>{
        const chats = await findOrCreateChat(data);
        socket.join(data.roomId);
        socket.emit("load-chat",chats.data);
        socket.on('send-chat',delta=>{
            socket.broadcast.to(data.roomId).emit("recieve-chat",delta);
        });
        socket.on('save-chat',async datas=>{
            await chat.create({
                roomChat:datas.roomId,
                users:datas.ownerId,
                content:datas.content
            })
        })

    })
}
async function findOrCreateChat(data){
    const {userId,ownerId,roomId,content}=data;
   if(data.roomId ===null){
    const newRoom =await room.create({
        user:[
            userId,
            ownerId,
        ],
    }).populate('users');
    return await chat.create({
        roomChat:newRoom._id,
        users:ownerId,
        content:content,
    });
   }
   const chatMessage=await chat.find({roomChat:roomId}).populate('users').populate('roomChat');
   if(chatMessage) return chatMessage;
}
module.exports={chatData};
