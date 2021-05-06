const chatLoading =(io,socket)=>{ 
    socket.on('chat',msg=>{
        io.emit('chat',msg);
    });
}
module.exports={chatLoading}