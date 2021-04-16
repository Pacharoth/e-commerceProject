<template>
    <div class="chat-content">
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
    </div>
</template>
<script>
export default {
    name:'Chat',
    props:['id'],
}
</script>
<style lang="scss">
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    
    .chat-content{
        width: 30%;
        height: 60%;
        background-color: white;
        box-shadow: $shadow_2;
        border-radius: 5px;
        position: absolute;
        bottom: 0;
        right: 7rem;
        display: flex;
        flex-direction: column;
        .chat-header{
            width: 100%;
            padding: 8px;
            box-shadow: $shadow_1;
            display: flex;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                box-shadow: $shadow_1;
                margin-right: 2%;
            }
            .chat-status{
                display: flex;
                justify-content: space-between;
                .chat-text{
                    
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
</style>