<template>
    <div class="chat-content" :class="chatcontent">
        <div class="chat-header">
            <button class="btn chat-customize">
                    <img v-if="chatData.img!==''" :src="'http://localhost:3000'+chatData.img" alt="">
                    <img v-else src="../../assets/logo.png" alt="">
                <div class="chat-status">
                    <div class="chat-text" >
                        <span >{{chatData.username}} ({{chatData.role}}) {{writing}}</span>
                        <span v-if="status=='online'" class="statususer" :style="{'--color':color}"> <div class="status-user" :style="{'--color':color}"></div> active</span>
                        <span v-else-if="status=='offline'" class="statususer" :style="{'--color':color}"> <div class="status-user" :style="{'--color':color}"></div> offline</span>
                    </div>
                </div>
            </button>
            <button  @click="closeChat" class="btn close"><em class="fas fa-times"></em></button>
        </div>
        <div class="content-all-chat">
            <div ref="chat" class="chatting">
                <slot v-for="msgs in msg" :key="msgs" class="content-chatting">
                    <div class="admin active" v-if="msgs.users._id==user.userid" >
                            <template v-if="mp3.test(msgs.content)">
                                <audio controls>
                                    <source :src="'http://localhost:3000'+msgs.content" type="audio/mp3">
                                </audio>
                            </template>
                            <template v-else>
                                <span>{{msgs.content}}</span>
                            </template>
                    </div>
                    <div class="admin" v-else-if="msgs.users._id!=user.userid" >
                        <img src="../../assets/logo.png" alt="">
                        <template v-if="mp3.test(msgs.content)">
                            <audio controls>
                                <source :src="'http://localhost:3000'+msgs.content" type="audio/mp3">
                            </audio>
                        </template>
                        <template v-else>
                            <span>{{msgs.content}}</span>
                        </template>
                    </div>
                    
                </slot>
                
            </div>
        

        </div>
        <div class="input-message" >
            <button class="btn" @click="onVoice" ref="voice"> <em class="bi bi-mic"></em></button>
            <form action="" class="d-flex" @submit.prevent="message">
                <input v-model="mess" ref="disable" type="text" class="form-control send"  placeholder="Aa">
                <button class="btn" ><em class="bi bi-play"></em></button>
            </form>
        </div>
    </div>
</template>
<script>
import { computed,ref, watch} from '@vue/runtime-core'
import { useStore } from 'vuex'
import {io} from 'socket.io-client';

export default {
    name:'Chat',
    props:['id'],
    setup() {
        //data
        const voice =ref(null);
        const disable =ref(null);
        const store = useStore(),
        audioT=ref(false),
        data = ref(),
        append =ref(null),
        chat_status = ref(""),
        msg = ref([]),
        color = ref(""),
        mess = ref(""),
        socket =ref(),
        chat=ref(null),
        getdata =ref(""),
        writing=ref(""),
        roomId =ref(""),
        mediaRecord = ref(null),
        chunk=ref([]),
        mp3=ref(null),
        src=ref([]);
        const s = io('http://localhost:3000');
        mp3.value=/.*\.mp3/
        socket.value=s;
        if(navigator.mediaDevices){
        navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
            mediaRecord.value = new window.MediaRecorder(stream);
                        mediaRecord.value.ondataavailable=(e)=>{
                chunk.value.push(e.data);
            }   
            console.log(mediaRecord.value.state)
            mediaRecord.value.onstop=(e)=>{
                console.log(e.data);
                let blob = new Blob(chunk.value,{'type':'audio/mp3'});
                socket.value.emit("send-voices",{
                    users:{
                        _id:user.value.userid
                    },
                    content:blob
                })
                socket.value.on('reData', async data=>{
                    if(data.content!==""){
                        msg.value.push(data);
                    }
                })
                chunk.value=[];
            }
        })
        }
     
        //computed
        const chatData=computed(()=>store.getters['chat/getChat']);
        const chatcontent=computed(()=>store.getters['chat/getChatContent'])
        const user = computed(()=>store.getters['auth/getSession'])


        watch(mess,()=>{
            if(mess.value!=""){
                socket.value.emit("writing","Typing Data...");
            }else{
                socket.value.emit("writing","");
            }

            const handler = data=>{
                writing.value=data
            }
            socket.value.on("recieve-writing",handler);
        })
        watch(chatData,()=>{
            socket.value=io("http://localhost:3000");
            socket.value.emit('get-chat',{
                userId:chatData.value.userId,
                ownerId:user.value.userid,
            });
           if(chat.value.scrollHeight>0){
                chat.value.scrollTop=chat.value.scrollHeight;
                console.log(chat.value.scrollTop);   
            }

            color.value="rgb(66, 207, 66)";
            chat_status.value="online";
        
            socket.value.on("recieve-changes",async data=>{
                socket.value.emit('getchats',{user:user.value.userid});
                console.log(data.users._id)
                if(data.content!==""){
                    msg.value.push(data);
                } 
            })
            socket.value.once('load-chats',msgs=>{
                roomId.value=msgs.roomId;
                const {chat} = msgs;
                if(chat){
                    msg.value=chat;
                }
            })
            const handler = data=>{
                writing.value=data;
            }
            
            socket.value.on("recieve-writing",handler);
            return()=>{
                socket.value.off("recieve-writing");
                socket.value.off('load-chats');
                socket.value.off("recieve-changes");
            }
        })
        const message =()=>{
            
            if(socket.value==null) return;
            if(chat.value.scrollHeight>0){
                chat.value.scrollTop=chat.value.scrollHeight;
                console.log(chat.value.scrollTop);   
            }
            socket.value.emit('send-changes',{
                users:{
                    _id:user.value.userid
                },
                content:mess.value,
            });
            mess.value=""

        }
        const closeChat = ()=>{
            store.dispatch('chat/changeContent','')
            store.dispatch('chat/putToChat',{});
            socket.value.disconnect();
            socket.value=s;
            
        };
        const loadStatus=()=>{}
        
        const onVoice = ()=>{
            const voices =  voice.value.classList
            if(voices.contains('active')){
                voices.remove('active');
                disable.value.disabled=false;   
                mediaRecord.value.stop();   
                socket.value.emit("writing","voice.....")      
            }else{
                voices.add('active');
                disable.value.disabled=true;
                mediaRecord.value.start();
                console.log(mediaRecord.value.state);
                socket.value.emit("writing","")
            }
        }
        
        const status = computed(()=>chat_status.value);
        return{
            data,
            chat_status,
            msg,
            color,
            mess,
            socket,
            chat,
            user,
            voice,
            onVoice,
            disable,
            //computed
            status,
            chatcontent,
            chatData,
            //method,
            message,
            closeChat,
            loadStatus,
            getdata,
            writing,
            mediaRecord,
            audioT,
            append,
            src,
            mp3

        }
    },

}
</script>
<style lang="scss">
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    :root{
        --color:'rgba(112, 112, 112, 0.664)';
    }
    .chat-content{
        display: none;
        width: 30%;
        height: 70%;
        background-color: white;
        box-shadow: $shadow_2;
        border-radius: 5px;
        position: fixed;
        bottom: 0;
        right: 7rem;
        flex-direction: column;
        &.active{
            display: flex;
            @include breakpoint-up(large){
                width: 49%;
            }
            @include breakpoint-down(medium){
                width: 49%;
                height: 60%;
            }
            @include breakpoint-down(small){
                right: 2%;
                width: 96%;
                height: 90%;
            }
        }
        .chat-header{
            width: 100%;
            padding: 8px;
            box-shadow: $shadow_1;
            display: flex;
            justify-content: space-between;
            .chat-customize{
                display: flex;
                width: 60%;
                justify-content: space-between;
                border-radius: 5px ;
                align-items: center;
                &:focus{
                    box-shadow: none;
                    background-color: #eeeeee;
                }
                &:hover{
                    box-shadow: none;
                    background-color: #eeeeee;
                }
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: $shadow_1;
                }
                .chat-status{
                    width: 80%;
                    display: flex;
                    justify-content: space-between;
                    .chat-text{
                        margin-left: 4%;
                        display: flex;
                        flex-direction: column;
                        text-align: left;
                        .statususer{
                            font-size: 12px;
                            color: var(--color);
                            display: flex;
                            align-items: center;
                            .status-user{
                                margin-right: 2%;
                                border-radius: 50%;
                                width: 10px;
                                height: 10px;
                                background-color: var(--color);
                            }
                        }
                        
                    }
                }
            }
            .close{
                border-radius: 50%;
                width: 50px;
                height: 50px;
                &:focus{
                    box-shadow: none;
                    color: grey;
                    background-color: #eee;
                }
                &:hover{
                    box-shadow: none;
                    color: grey;
                    background-color: #eee;
                }
            }
        }
        .input-message{
            display: flex;
            padding: 2%;
            width: 100%;
            form{
                width: 100%;
            }
            .send{
                width: 90%;
                border-radius: 50px ;
                margin-left: 2%;
                margin-right: 2%;
                border: none;
                background: #eeeeee;
                &:focus{
                    box-shadow: none;
                
                }
            }
            .active
            {
                background: #eeeeee;
                color: black;
                box-shadow: $shadow_1;
            }
            button{
                border-radius: 50%;
                color: $blue_color;
                box-shadow: none;
                
                &:hover{
                    background: #eeeeee;
                    color: black;
                    box-shadow: $shadow_1;
                }
            }
        }
        .content-all-chat{
            height: 100%;
            width: 100%;
            position: relative;
            .chatting{
                position: absolute;
                width: 100%;
                max-height: 100%;
                bottom: 0;
                overflow-y: visible;
                overflow-x: hidden;
                &::-webkit-scrollbar-button{
                    height: 10px;
                    width: 10px;
                }
                &::-webkit-scrollbar{   
                    width: 10px;
                    &:hover{
                            background-color:rgb(250, 241, 241) ;
                        }
                }
                &::-webkit-scrollbar-thumb{
                    width: 10px;
                    &:hover{
                    background-color: rgb(212, 209, 209);
                    height: 20px;
                    border-radius: 50px;
                    }
                }
                &::-webkit-resizer{
                    height: 50px;
                }
                .admin{
                    width: 100%;
                    padding: 2%;
                    display: flex;
                    justify-items: center;
                    position: relative;
                    &.active{
                        width: 100%;
                        flex-direction: row-reverse;
                        img{
                            margin-left: 2%;
                        }
                        span{
                            background-color: $color_background_btn;
                            color:$blue_color;
                        }
                    }
                    
                    img{
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        box-shadow: $shadow_1;
                    }
                    span{
                        display: flex;
                        align-items: center;
                        background-color: #eeeeee;
                        border-radius: 50px;
                        padding-left: 4%;
                        padding-right:4% ;
                        padding-top: 1%;
                        padding-bottom: 1%;
                        margin-left: 2%;
                        box-shadow: $shadow_1;
                        font-size: 14px;
                        
                    }
                }
            }

        }
    }
</style>