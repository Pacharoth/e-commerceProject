<template>
    <div class="chat-content" :class="chatcontent">
        <div class="chat-header">
            <button class="btn chat-customize">
                    <img src="../../assets/logo.png" alt="">
                <div class="chat-status">
                    <div class="chat-text" >
                        <span >{{chatData.username}} ({{chatData.role}})</span>
                        <span v-if="status=='online'" class="statususer" :style="{'--color':color}"> <div class="status-user" :style="{'--color':color}"></div> active</span>
                        <span v-else-if="status=='offline'" class="statususer" :style="{'--color':color}"> <div class="status-user" :style="{'--color':color}"></div> offline</span>
                    </div>
                </div>
            </button>
            <button  @click="closeChat" class="btn close"><em class="fas fa-times"></em></button>
        </div>
        <div class="content-all-chat">
            <div ref="chat" class="chatting">
                <div class="admin " v-for="msgs in msg" :key="msgs">
                    <img src="../../assets/logo.png" alt="">
                    <span>{{msgs.content}}</span>
                </div>
            </div>
        </div>
        <form class="input-message" @submit.prevent="message">
            <button class="btn"> <em class="bi bi-mic"></em></button>
            <input v-model="mess" type="text" class="form-control send"  placeholder="Aa">
            <button class="btn"><em class="bi bi-play"></em></button>
        </form>
    </div>
</template>
<script>
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watchEffect } from '@vue/runtime-core'
import { useStore } from 'vuex'
import {io} from 'socket.io-client';

export default {
    name:'Chat',
    props:['id'],
    setup() {
        //data
        const store = useStore();
        const data = ref();
        const chat_status = ref("");
        const msg = ref([]);
        const color = ref("");
        const mess = ref("");
        const socket =ref();
        const chat=ref(null)
        const getdata =ref("");
        onBeforeMount(()=>{
            const s = io('http://localhost:3000');
            socket.value=s;
            return()=>{
                s.disconnect();
            }
        })
        onMounted(()=>{
            color.value="rgb(66, 207, 66)";
            chat_status.value="online"
            if(socket.value==null) return
            socket.value.emit('get-chat',{
                userId:chatData.value.userId,
                ownerId:user.value.userid,
            });
            socket.value.on('load-chat',msgs=>{
                msg.value=msgs
            })
            return ()=>{
                socket.value.off('load-chat');
            }
        },[socket,chatData,user]);
        onUnmounted(()=>{
            socket.value.disconnect();
        })
        //watch effect
        watchEffect(()=>{  
            window.ononline=()=>{
                color.value="rgb(66, 207, 66)";
                chat_status.value="online";
            }
            window.onoffline=()=>{
                color.value = "rgba(112, 112, 112, 0.664)";
                chat_status.value="offline";
            }
        });
        watchEffect(()=>{
            if(socket.value==null) return
            socket.value.on('recieve-chats',async deta=>{
                msg.value.push(deta);
                getdata.value=deta
            })
        },[socket,msg])
        watchEffect(()=>{
            if(socket.value==null) return
            const interval = setInterval(()=>{
                socket.value.on('save-chat',getdata.value);
            },2000)
            return clearInterval(interval);
        })
        //computed
        const chatData=computed(()=>store.getters['chat/getChat']);
        const chatcontent=computed(()=>store.getters['chat/getChatContent'])
        const user = computed(()=>store.getters['auth/getSession'])
        //method
        const message =()=>{
            if(socket.value==null) return;
           if(chat.value.scrollHeight>0){
                chat.value.scrollTop=chat.value.scrollHeight+64
            }
            socket.value.emit('send-changes',mess.value);
            mess.value=""
        }
        const closeChat = ()=>{
            store.dispatch('chat/changeContent','')
            store.dispatch('chat/putToChat',{});
        };
        const loadStatus=()=>{}

        const status = computed(()=>chat_status.value);

        return{
            data,
            chat_status,
            msg,
            color,
            mess,
            socket,
            chat,
            //computed
            status,
            chatcontent,
            chatData,
            //method,
            message,
            closeChat,
            loadStatus,

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
            .send{
                width: 80%;
                border-radius: 50px ;
                margin-left: 2%;
                margin-right: 2%;
                border: none;
                background: #eeeeee;
                &:focus{
                    box-shadow: none;
                
                }
            }
            button{
                border-radius: 50%;
                color: $blue_color;
                i{
                    &:focus{
                        color: grey;
                    }
                    
                }
                &:focus{
                    box-shadow: none;
                    background: #eeeeee;
                    color: black;
                }
                &:hover{
                    background: #eeeeee;
                    color: black;
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
                overflow-y: scroll;
                &::-webkit-resizer{
                    width: 10px;
                }
                &::-webkit-scrollbar{   
                width: 10px;
                &:hover{
                        background-color:rgb(250, 241, 241) ;
                    }
                }
                &::-webkit-scrollbar-thumb{
                    &:hover{
                    background-color: rgb(212, 209, 209);
                    height: 20px;
                    border-radius: 50px;
                    }
                }
                .admin{
                    width: 100%;
                    padding: 2%;
                    display: flex;
                    justify-items: center;
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
                        margin-left: 2%;
                        box-shadow: $shadow_1;
                        font-size: 14px;
                        
                    }
                }
            }

        }
    }
</style>