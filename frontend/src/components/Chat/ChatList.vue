<template>
    <Suspense>
        <template #default>
                <div class="content-chat" >
            <div class="list-chat" :class="chatlist">
            <div class="content-logo-chat">
                    <h4 >Chats</h4>
            </div>
            <div class="search-component" v-if="searchData">
                <button class="btn" @click="searchUser"><em class="fas fa-long-arrow-alt-left"></em></button> <input type="text" v-model="search" class="form-control search-user" placeholder="&#xf002; search" style="font-family: Arial, 'Font Awesome 5 Free'">
            </div>
            <div class="search-component" v-else>
                <input type="text" v-model="search" @click="changeToSearchUser" class="form-control search-user" placeholder="&#xf002; search" style="font-family: Arial, 'Font Awesome 5 Free'">
            </div>
            <div class="list-user" v-if="searchData">
                <template v-for="chat in listChat" >
                <button class="users btn" 
                @click="popChat({
                    ownerId:chat._id,
                    username:chat.username,
                    role:chat.roles.name
                })" 
                v-if="chat._id!==user.userid" :key="chat">
                    <img src="../../assets/logo.png" alt="">
                    <div class="chat-time">
                        <div class="chat">
                            <span >{{chat.username}} ({{chat.roles.name}})</span>
                        </div>
                        <div class="status" :style="{'background-color':color}"></div>
                    </div>
                </button>    
                </template>
                
            </div>
            <div class="list-user" v-else>
                <button class="users btn" @click="popChat({
                    ownerId:chat.users[0]._id,
                    username:chat.users[0].username,
                    role:role.filter(element=>element._id===chat.users[0].roles)[0].name,
                })" v-for="chat in chatSocket" :key="chat">
                    <img src="../../assets/logo.png" alt="">
                    <div class="chat-time">
                        <div class="chat" >
                                <span v-for="i in role" :key="i">
                                    <template v-if="chat.users[0].roles===i._id">{{chat.users[0].username}} ({{i.name}})</template>
                                </span>
                                <span class="text-chat" v-if="chat.chat[chat.chat.length-1]">
                                    <template v-if="mp3.test(chat.chat[chat.chat.length-1].content)">
                                        voice
                                    </template>
                                    <template v-else>
                                        {{chat.chat[chat.chat.length-1].content}}
                                    </template>
                                </span>
                        </div>
                        <div class="status" :style="{'background-color':color}"></div>
                    </div>
                </button>
            </div>
            </div>
            <chat />
        </div>
        </template>
        <template #fallback>
            <chat-loading/>
        </template>
    </Suspense>
</template>
<script>
import { computed, onBeforeMount, onMounted, ref, watchEffect } from '@vue/runtime-core';
import Chat from './Chat';
import ChatLoading from './ChatLoading.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { localhost } from '../../utils/FormValidation';
import { io } from 'socket.io-client';
export default {
    name:"ChatList",
    setup() {
        const store =useStore()
        const color = ref("");
        const search = ref("");
        const searchData=ref(false);
        const listChat = ref([]);
        const socket = ref(null);
        const chatSocket =ref([]);
        const id =ref("");
        const mp3 = ref(null);
        //computed
        const user = computed(()=>store.getters['auth/getSession'])
        const role = computed(()=>store.getters['role/getRoles'])
        const chatlist= computed(()=>store.getters['chat/getChatList']);
        mp3.value=/.*\.mp3/

        onBeforeMount(()=>{
            const s = io(localhost);
            socket.value=s;
            return()=>{
                s.disconnect();
            }
        })
        onMounted(()=>{
            if(socket.value==null) return socket.value;
            id.value=user.value.userid
            var interval=null
            interval=setInterval(()=>{
                if(user.value.userid)
                    socket.value.emit('getchats',{user:user.value.userid})
            },2000);
            
            return()=>{
                clearInterval(interval);
            }
        })
        onMounted(()=>{
            if(socket.value==null) return socket.value;
            socket.value.on('listchats',async data=>{
                console.log(data);
                chatSocket.value=data;
            })
            return()=>{
                socket.value.off('listchats');
            }
        })
        watchEffect(()=>{
            window.ononline=()=>{
                color.value = 'green';
            }
            window.onoffline=()=>{
                color.value = 'grey';
            }
        })
        watchEffect(async()=>{
            const response=await axios.post(localhost+'/post/search',{user:search.value});
            listChat.value=response.data;
        })
        //method
        const popChat = (data)=>{
            const {role,ownerId,username}=data
            store.dispatch('chat/changeContent','active');
            store.dispatch('chat/changeList','');
            if(searchData){
                store.dispatch('chat/putToChat',{
                    userId:ownerId,
                    username:username,
                    role:role,
                });
            }else{
                store.dispatch('chat/putToChat',{
                    userId:ownerId,
                    username:username,
                    role:role,
                })
            }
        }
        const searchUser=()=>{
            searchData.value=false
        }
        const changeToSearchUser=()=>{
            searchData.value=true
        }
        return{
            color,
            chatlist,
            chatSocket,
            listChat,
            searchData,
            search,
            socket,
            id,
            role,
            //method
            popChat,
            searchUser,
            changeToSearchUser,
            user,
            mp3,
        }
    },
    data(){
      return{
          active:"",
      }  
    },
    components:{
        Chat,   
        ChatLoading,
    },

}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    // @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .list-chat{
        @include contentlist(30%);
        @include breakpoint-up(large){
            top:4%;
            // height: 70%;
        }
        @include breakpoint-down(medium){
            top:5%;
        }
       
        .content-logo-chat{
            padding: 3%;
        }
        .search-component{
            width: 100%;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            display: flex;
            .search-user{
                margin-top: 1%;
                border: none;
                border-radius: 50px;
                background-color: #eeeeee;
                &:active{
                    --webkit-appearance:none;
                }
                &:focus{
                    box-shadow: none;
                }
            }
        }
        button{
            border-radius: 50%;
            margin-right: 2%;
            &:hover{
                background:rgba(214, 213, 213, 0.933);
                color: grey;
            }
        }
        .list-user{
           @include contentpopup;
        }
        
    }
</style>