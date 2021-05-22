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
                <button class="users btn" 
                @click="popChat({
                    ownerId:chat._id,
                    username:chat.username,
                })" 
                v-for="chat in listChat" :key="chat">
                    <img src="../../assets/logo.png" alt="">
                    <div class="chat-time">
                        <div class="chat">
                            <span >{{chat.username}} ({{chat.roles.name}})</span>
                        </div>
                        <div class="status" :style="{'background-color':color}"></div>
                    </div>
                </button>
            </div>
            <div class="list-user" v-else>
                <button class="users btn" @click="popChat">
                    <img src="../../assets/logo.png" alt="">
                    <div class="chat-time">
                        <div class="chat">
                            <span >Pizza (seller)</span>
                            <span class="text-chat">hello world</span>
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
import { computed, ref, watchEffect } from '@vue/runtime-core';
import Chat from './Chat';
import ChatLoading from './ChatLoading.vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { localhost } from '../../utils/FormValidation';
export default {
    name:"ChatList",
    setup() {
        const store =useStore()
        const color = ref("");
        const search = ref("");
        const searchData=ref(false);
        const listChat = ref([]);
        const chatlist= computed(()=>store.getters['chat/getChatList']);
        const popChat = (data)=>{
            const {ownerId,username,roomId}=data
            store.dispatch('chat/changeContent','active');
            store.dispatch('chat/changeList','');
            if(searchData){
                store.dispatch('chat/putToChat',{
                    userId:ownerId,
                    username:username
                });
            }else{
                store.dispatch('chat/putToChat',{
                    userId:ownerId,
                    roomId:roomId,
                    username:username
                })
            }
        }
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
        const searchUser=()=>{
            searchData.value=false
        }
        const changeToSearchUser=()=>{
            searchData.value=true
        }
        return{
            color,
            chatlist,
            search,
            popChat,
            listChat,
            searchData,
            searchUser,
            changeToSearchUser,
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