<template>
   <div class="content-chat">
        <div class="list-chat">
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
        <Chat :chat="active"></Chat>
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
        Chat,
    },
    methods:{
        popChat(){
            this.active="active";
            
        }
    }

}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    // @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .list-chat{
        display: none;
        width: 30%;
        max-height: 85%;
        background: white;
        position: absolute;
        box-shadow: $shadow_2;
        border-radius: 5px;
        right:3rem;
        top:8%;
        color: grey;
        overflow-y: scroll;
        &::-webkit-scrollbar{
            width: 5px;
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
            padding: 5% 2% 2% 2%;
            display: flex;
            flex-direction: column;
            
            .users{
                border-radius: 10px;
                display: flex;
                align-items: center;
                &:active,&:hover{
                    background-color: #eeeeee;
                }
                &:focus{
                    box-shadow: none;
                }
                img{
                    border-radius: 50%;
                    background-color: white;
                    width: 50px;
                    height: 50px;
                    margin-right: 4% ;
                    &:hover{
                    box-shadow: $shadow_1;

                    }
                }
                .chat-time{
                    width: 80%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .chat{
                        display: flex;
                        flex-direction: column;
                        .text-chat{
                            color: grey;
                            font-size: 12px;
                            text-align: left;
                        }
                    }
                    .status{
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: rgb(78, 204, 78);
                    }
                }

            }
        }
        
    }
</style>