const chatLoading =(io,socket)=>{ 
    socket.on('chat',(msg,id)=>{
        console.log(msg)
        socket.join(id);
        socket.emit('recieve',msg);
        
    });
}
module.exports={chatLoading}