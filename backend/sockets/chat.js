const room=require("../models/RoomChat");
const chat =require('../models/chatModel');
const chatList=(io,socket)=>{
    socket.on("getchats",async id=>{
    })
}
const chatData = (io,socket)=>{
    socket.on('get-chat', async data=>{
        console.log(data)
        socket.on("send-changes",async data=>{
            console.log(data);
        })
    })
}
async function findOrCreateChat(data){

}
module.exports={
    chatData,
    chatList
};
