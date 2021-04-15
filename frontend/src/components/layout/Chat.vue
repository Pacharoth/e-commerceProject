<template>
   <div class="content-chat">
        <div class="list-chat">
           <div class="content-logo-chat">
                <h4 >Chats</h4>
           </div>
            <input type="text" class="form-control search-user">
        </div>
        <div class="chat-content">
            <p>hey man</p>
        </div>
   </div>
</template>
<script>
export default {
    name:"Chat"
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';

    .list-chat{
        width: 30%;
        height: 85%;
        background: white;
        position: absolute;
        box-shadow: $shadow_2;
        border-radius: 5px;
        right:3rem;

        .content-logo-chat{
            border-bottom:1px solid rgb(197, 193, 193);
            // box-shadow: $shadow_1;
            padding: 2%;
        }
        .search-user{
            margin-top: 2%;
        }
    }
    .chat-content{
        width: 30%;
        height: 60%;
        background-color: white;
        box-shadow: $shadow_2;
        border-radius: 5px;
        position: absolute;
        bottom: 0;
        right: 7rem;
    }
</style>