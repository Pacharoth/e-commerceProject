<template>
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
                    <div class="status"></div>
                </div>
               </button>
           </div>
        </div>
        <chat/>
   </div>
</template>
<script>
import Chat from './Chat';
export default {
    name:"ChatList",
    data(){
      return{
          active:"",
      }  
    },
    components:{
        Chat
    },
    computed:{
        chatlist(){
            console.log(this.$store.getters['chat/getChatList'])
            return this.$store.getters['chat/getChatList'];
        }
    },
    methods:{
        popChat(){
           this.$store.dispatch('chat/changeContent','active');
           this.$store.dispatch('chat/changeList','');
        }
    }

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