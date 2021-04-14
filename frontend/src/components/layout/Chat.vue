<template>
   <div class="content-chat">
        <div class="list-chat">
            <p>Hello World</p>
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
.list-chat{
    width: 30%;
    height: 85%;
    background: white;
    position: absolute;
    box-shadow: $shadow_2;
    border-radius: 5px;
    right:3rem;
}
.chat-content{
    width: 30%;
    height: 60%;
    background-color: white;
    box-shadow: $shadow_2;
    border-radius: 5px;
    position: absolute;
    bottom: 0;
    right: 4rem;
}
</style>