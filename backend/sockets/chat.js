const room=require("../models/RoomChat");
const chat =require('../models/chatModel');
const chatList=(io,socket)=>{
    socket.on("getchats",async id=>{
        var users = await room.find({users:id}).populate('chat').populate('users');
        users= users.filter(element=>{
                var auser=[]
                var count=0;
            for (var i in element.users){
                if(element.users[i]._id==id){
                    count++;
                }else{
                    element.users[1]={}
                    element.users[i]= element.users[i];
                }
                if(count>=2){
                    auser=element.users[i];
                    element.users[1]={}
                    element.users[0]=auser;
                }
            }
            
            return element;
        })
        socket.join(id);
        socket.emit("listchats",users);
    })
}
const chatData = (io,socket)=>{
    socket.on('get-chat', async data=>{
        console.log(data)
        const chats = await findOrCreateChat(data);
        if(data.roomId){
            socket.join(data.roomId); //join room
        }else{
            data.roomId = chats[0].roomChat._id
            socket.join(chats[0].roomChat._id);
        }
        console.log(chats)
        socket.emit("load-chat",chats); //getData in that room
        socket.emit("getchats",data.ownerId);
        socket.on("send-changes",deta=>{
            socket.broadcast.to(data.roomId).emit('receive-chats',deta);//broadcast in room
        })
        socket.on('save-chat',async data=>{
            var achat  = new chat({
                roomChat:data.roomId,
                status:"read",
                chatAt:new Date,
                users:data.ownerId,
            })
        })

    })
}
async function findOrCreateChat(data){
    var {userId,ownerId,roomId,content}=data;
    console.log(userId,ownerId,roomId)
    const roomid= await room.find({users:[ownerId,userId]});
    if(roomid.length>0&&content!==undefined){
        roomId=roomid[0]._id
        const newChat = new chat({
            users:ownerId,
            roomChat:roomId,
            content:content,
            chatAt:new Date,
        })
        roomid[0].chat.push(newChat);
        await roomid[0].save();
        await newChat.save()
        return await chat.find({_id:newChat._id}).populate('users').populate('roomChat');
    }else if(content!==undefined){
        if(data.roomId ===null|| data.roomId===undefined){
            const newRoom =new room({
                users:[
                    userId,
                    ownerId,
                ],
            });
            const newChat= new chat({
                roomChat:newRoom._id,
                users:ownerId,
                content:content,
                chatAt:new Date,
            });
            newRoom.chat.push(newChat);
            await newRoom.save();
            await newChat.save();
            const newChats = await chat.find({_id:newChat._id}).populate('users').populate('roomChat');
            return newChats;
        }
    }
    else{
        roomId=roomid[0]._id;
        const chatMessage=await chat.find({roomChat:roomId}).populate('users').populate('roomChat');
        if(chatMessage) return chatMessage;
    }
}
module.exports={
    chatData,
    chatList
};
