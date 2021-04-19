<template>
    <div class="notification-content" :class="active">
        <div class="notification-title">
            <h4>Notification</h4>
        </div>
        <div class="notification-header">
            <h3>New</h3>
        </div>
        <div class="list-notification">
            <button class="users btn">
                <img src="../../assets/logo.png" alt="">
                <div class="chat-time">
                    <div class="chat">
                         <span >Pizza (seller)  </span>
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name:'Notification',
    computed:{
        active(){
            return this.$store.getters['notification/getContent']
        }
    }
}
</script>
<style lang="scss" scope>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    .notification-content{
       @include contentlist(30%);
       .notification-title{
           padding: 2%;
           h4{
               font-weight: bold;
           }
       }
       .notification-header{
           padding-left: 2%;
           h3{
               font-size: 1.2rem;
               font-weight: bold;
           }
       }
       .list-notification{
           @include contentpopup;
           padding-top:2% ;
           padding-left:1% ;
       }
    }
</style>