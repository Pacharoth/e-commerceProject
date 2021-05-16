const chatLoading =(io,socket)=>{ 
    socket.on('chat',(msg,id)=>{
        console.log(msg)
        socket.join(id);
        socket.emit('recieve',msg);
        
    });
}
const statusChat = (io,socket)=>{
    socket.on('status',(msg,id)=>{
        socket.join(id);
    })
}
module.exports={
    chatLoading,
    statusChat,
}