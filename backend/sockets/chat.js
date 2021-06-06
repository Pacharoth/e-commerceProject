const room=require("../models/RoomChat"),
    chat =require('../models/chatModel'),
    fs = require('fs'),
    uuid =require('uuid');
const chatList=(io,socket)=>{
    socket.on("getchats",async id=>{
        console.log(id);
        var users = await room.find({users:{
            _id:id.user
        }}).populate('chat').populate('users');
        users= users.filter(element=>{
                var auser=[]
                var count=0;
                element.status="";
                element.user=""
                element.status="online";
                element.user= id.user.toString();
            for (var i in element.users){
               
                if(element.users[i]._id==id.user){
                    count++;
                }else{
                    auser=element.users[i];
                    element.users[0]= auser;
                }
                if(count>=2){
                    auser=element.users[i];
                    element.users[1]={}
                    element.users[0]=auser;
                }
            }

            return element;
        })
        socket.emit('listchats',users)
    })
}
const chatData = (io,socket)=>{
    socket.on('get-chat', async data=>{
        const roomOrchat= await findOrCreateChat(data);
        // socket.join(roomOrchat.roomId);
        console.log(roomOrchat)
        var {roomId} = roomOrchat;
        if(roomId!==""){
            socket.join(roomId.toString());

            socket.emit("load-chats",roomOrchat);
            socket.on("writing",async data=>{
                socket.broadcast.to(roomId.toString()).emit("recieve-writing",data);
            
            })
            socket.on("send-changes",async data=>{
                console.log(data);
                io.in(roomId.toString()).emit("recieve-changes",data);
                await saveChat(data,roomId);
                
            })
            socket.on("send-voices",async data=>{
                const path = `/assets/voice/${uuid.v4()}.mp3`
                fs.appendFile("./public"+path,data.content,async (err)=>{
                    if(err){
                        console.log(err)
                    }else{
                        data.content = path
                        console.log(data);
                        io.in(roomId.toString()).emit("recieve-changes",data);
                        await saveChat(data,roomId);
                    }
                })                 
              
            })
           
        }
       
    })
}
async function saveChat(data,roomId){
    const saveRoom = await room.find({_id:roomId}).populate('chat').populate('users');
    if(saveRoom.length>0){
        if(data.content!==""){
            const chats = new chat({
                users:data.users._id,
                roomChat:saveRoom[0]._id,
                content:data.content,
                chatAt:new Date,
            });
            saveRoom[0].chat.push(chats);
            await saveRoom[0].save();
            await chats.save();
        }
    }
}
/*room Chat
users:[{
    type:Schema.Types.ObjectId,
    ref:'users',
}],
chat:[{
    type:Schema.Types.ObjectId,
    ref:'chat',
}]*/
/*chat
    users:{
        type:Schema.Types.ObjectId,
        ref:'users',
    }
    ,
    roomChat:{
        type:Schema.Types.ObjectId,
        ref:'roomChat',
    },
    content:{
        type:String,
    },
    chatAt:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:'unread',
    },

*/
async function findOrCreateChat(data){
    var {userId,ownerId,message} = data;
    if(userId!=undefined){
        var roomUser = await room.find({$and:[
            {users:userId},
            {users:ownerId}
        ]})
        if(roomUser.length<=0){
            if(userId!=null){
                roomUser = new room({
                    users:[userId,ownerId],
                })
                
                return await roomUser.save();
            }
        }else{
            return {chat:await chat.find({roomChat:roomUser[0]._id}).populate('users'),roomId:roomUser[0]._id};
        }
    }else{
        return{roomId:""}
    }
}
module.exports={
    chatData,
    chatList
};
