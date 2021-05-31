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
               <button class="users btn">
                <div class="avatar"></div>
                <div class="chat-time">
                    <div class="chat">
                         <span class="chat-content"></span>
                        <span class="text-chat1"></span>
                    </div>
                </div>
               </button>
           </div>
        </div>
   </div>
</template>
<script>
export default {
    
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
           .avatar{
               border-radius: 50%;
               width: 50px;
               height: 50px;

           }
           .chat{
               .text-chat1{
                   background-color: #eeeeee;
                   padding: 2%;
               }
               .chat-content{
                   padding: 2%;
                   background-color: #eeeeee;

               }
           }
        }
        
    }
</style>