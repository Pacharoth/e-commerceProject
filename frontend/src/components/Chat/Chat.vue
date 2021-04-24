<template>
    <div class="chat-content" :class="chatcontent">
        <div class="chat-header">
            <button class="btn chat-customize">
                    <img src="../../assets/logo.png" alt="">
                <div class="chat-status">
                    <div class="chat-text">
                        <span >Pizza (seller)</span>
                        <span class="statususer"> <div class="status-user"></div> active</span>
                    </div>
                </div>
            </button>
            <button  @click="closeChat" class="btn close"><em class="fas fa-times"></em></button>
        </div>
        <div class="content-all-chat">
            <div class="admin">
                <img src="../../assets/logo.png" alt="">
                <span>Hello world</span>
            </div>
            
        </div>
        <div class="input-message">
            <button class="btn"> <em class="bi bi-mic"></em></button>
            <input type="text" class="form-control send"  placeholder="Aa">
            <button class="btn"><em class="bi bi-play"></em></button>
        </div>
    </div>
</template>
<script>
export default {
    name:'Chat',
    props:['id','chat'],
    data(){
        return{
            chat_status:"",
        }
    },
    computed:{
        chatcontent(){
            return this.$store.getters['chat/getChatContent'];
        }
    },
    methods:{
        closeChat(){
            this.$store.dispatch('chat/changeContent','');
        }
    }

}
</script>
<style lang="scss">
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    
    .chat-content{
        display: none;
        width: 30%;
        height: 70%;
        background-color: white;
        box-shadow: $shadow_2;
        border-radius: 5px;
        position: fixed;
        bottom: 0;
        right: 7rem;
        flex-direction: column;
        &.active{
            display: flex;
            @include breakpoint-up(large){
                width: 49%;
            }
            @include breakpoint-down(medium){
                width: 49%;
                height: 60%;
            }
            @include breakpoint-down(small){
                right: 2%;
                width: 96%;
                height: 90%;
            }
        }
        .chat-header{
            width: 100%;
            padding: 8px;
            box-shadow: $shadow_1;
            display: flex;
            justify-content: space-between;
            .chat-customize{
                display: flex;
                width: 60%;
                justify-content: space-between;
                border-radius: 5px ;
                align-items: center;
                &:focus{
                    box-shadow: none;
                    background-color: #eeeeee;
                }
                &:hover{
                    box-shadow: none;
                    background-color: #eeeeee;
                }
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: $shadow_1;
                }
                .chat-status{
                    width: 80%;
                    display: flex;
                    justify-content: space-between;
                    .chat-text{
                        margin-left: 4%;
                        display: flex;
                        flex-direction: column;
                        text-align: left;
                        .statususer{
                            font-size: 12px;
                            color: rgb(66, 207, 66);
                            display: flex;
                            align-items: center;
                            .status-user{
                                margin-right: 2%;
                                border-radius: 50%;
                                width: 10px;
                                height: 10px;
                                background-color: rgb(66, 207, 66);
                            }
                        }
                        
                    }
                }
            }
            .close{
                border-radius: 50%;
                width: 50px;
                height: 50px;
                &:focus{
                    box-shadow: none;
                    color: grey;
                    background-color: #eee;
                }
                &:hover{
                    box-shadow: none;
                    color: grey;
                    background-color: #eee;
                }
            }
        }
        .input-message{
            display: flex;
            padding: 2%;
            width: 100%;
            .send{
                width: 80%;
                border-radius: 50px ;
                margin-left: 2%;
                margin-right: 2%;
                border: none;
                background: #eeeeee;
                &:focus{
                    box-shadow: none;
                
                }
            }
            button{
                border-radius: 50%;
                color: $blue_color;
                i{
                    &:focus{
                        color: grey;
                    }
                    
                }
                &:focus{
                    box-shadow: none;
                    background: #eeeeee;
                    color: black;
                }
                &:hover{
                    background: #eeeeee;
                    color: black;
                }
            }
        }
        .content-all-chat{
            height: 80%;
            width: 100%;
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
            .admin{
                width: 80%;
                margin-top: 2%;
                padding: 2%;
                display: flex;
                justify-items: center;
                &.active{
                    width: 100%;
                    flex-direction: row-reverse;
                    img{
                        margin-left: 2%;
                    }
                    span{
                        background-color: $color_background_btn;
                        color:$blue_color;
                    }
                }
                img{
                    width: 15%;
                    height: 15%;
                    border-radius: 50%;
                    box-shadow: $shadow_1;
                }
                span{
                    display: flex;
                    align-items: center;
                    background-color: #eeeeee;
                    border-radius: 50px;
                    padding-left: 4%;
                    padding-right:4% ;
                    margin-left: 2%;
                    box-shadow: $shadow_1;
                    font-size: 14px;
                    
                }
            }
        }
    }
</style>