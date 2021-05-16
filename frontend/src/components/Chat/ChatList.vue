<template>
    <Suspense>
        <template #default>
                <div class="content-chat" >
            <div class="list-chat" :class="chatlist">
            <div class="content-logo-chat">
                    <h4 >Chats</h4>
            </div>
            <div class="search-component">
                    <input type="text" class="form-control search-user" placeholder="&#xf002; search" style="font-family: Arial, 'Font Awesome 5 Free'">
            </div>
            <div class="list-user">
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
            <chat/>
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
export default {
    name:"ChatList",
    setup() {
        const store =useStore()
        const color = ref("");
        
        const chatlist= computed(()=>store.getters['chat/getChatList']);
        const popChat = ()=>{
            store.dispatch('chat/changeContent','active');
            store.dispatch('chat/changeList','');
        }
        watchEffect(()=>{
            window.ononline=()=>{
                color.value = 'green';
            }
            window.onoffline=()=>{
                
                color.value = 'grey';
            }
        })
        return{
            color,
            chatlist,
            popChat,
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
        .list-user{
           @include contentpopup;
        }
        
    }
</style>