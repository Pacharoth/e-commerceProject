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
               <button class="users btn">
                   <img src="../../assets/logo.png" alt="">
                <div class="chat-time">
                    <div class="chat">
                         <span >Pizza (seller)</span>
                        <span class="text-chat">hello world</span>
                    </div>
                    <div class="status"></div>
                </div>
               </button>
               <button class="users btn">
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
        <!-- <div class="chat-content">
            <div class="chat-header">
                <button class="btn">
                        <img src="../../assets/logo.png" alt="">
                    <div class="chat-status">
                        <div class="chat-text">
                            <span>Pizza (seller)</span>
                            <span>active <div class="status"></div> </span>
                        </div>
                    </div>
                </button>
                <button class="btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="input-message">

            </div>
        </div> -->
        <Chat></Chat>
   </div>
</template>
<script>
import Chat from './Chat';
export default {
    name:"ChatList",
    props:[''],
    components:{
        Chat,
    }

}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    // @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .list-chat{
        width: 30%;
        height: 85%;
        background: white;
        position: absolute;
        box-shadow: $shadow_2;
        border-radius: 5px;
        right:3rem;
        top:8%;
        color: grey;
        .content-logo-chat{
            // box-shadow: $shadow_1;
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