const room=require("../models/RoomChat");
const chat =require('../models/chatModel');
const chatList=(io,socket)=>{
    socket.on("getchats",async id=>{
        const user = await room.find().populate('chat').populate('users').where("users").in([id]);
        socket.join(id);
        socket.emit("listchats",user);
    })
}
const chatData = (io,socket)=>{
    // socket.on('get-chat',async data=>{
    //     const chats = await findOrCreateChat(data);
    //     socket.join(data.roomId);
    //     socket.emit("load-chat",chats.data);
    //     socket.on('send-chat',delta=>{
    //         socket.broadcast.to(data.roomId).emit("recieve-chat",delta);
    //     });
    //     socket.on('save-chat',async datas=>{
    //         await chat.create({
    //             roomChat:datas.roomId,
    //             users:datas.ownerId,
    //             content:datas.content
    //         })
    //     })

    // })
    socket.on('get-chat', async data=>{
        const chat = await findOrCreateChat(data);
        if(data.roomId){
            socket.join(data.roomId); //join room
        }else{
            socket.join(chat.roomChat._id);
        }
        socket.emit("load-chat",chat); //getData in that room
        socket.on("send-changes",deta=>{
            socket.broadcast.to(deta.roomChat._id).emit('receive-chats',deta);//broadcast in room
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
    const newChat=await chat.create({
        roomChat:newRoom._id,
        users:ownerId,
        content:content,
    }).populate('users');
    newRoom.chat.push(newChat);
    await newRoom.save(callback);
   }
   const chatMessage=await chat.find({roomChat:roomId}).populate('users').populate('roomChat');
   if(chatMessage) return chatMessage;
}
module.exports={
    chatData,
    chatList
};
