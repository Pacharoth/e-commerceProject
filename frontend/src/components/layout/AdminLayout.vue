<template>
    <div class="content" ref="content">
        <div class="sidebar " ref="sidebar">
            <button class="btn close" @click="loadSideBar()"><i class="fas fa-times"></i></button>
            <h3 class="text-center"><a href="" class="logo">Admin Dashboard</a></h3>
            <ul class="link nav nav-pill flex-column mb-auto">
                <li class=""><a class="nav-link" href=""><i class="bi bi-house-door me-2"></i>Dashboard</a></li>
                <li ><a href="" class="nav-link"><i class="bi bi-person me-2"></i>Seller</a></li>
                <li ><a href="" class="nav-link"><i class="bi bi-people me-2"></i>Customer</a></li>
                <li ><a href="" class="nav-link"><i class="bi bi-person-plus-fill me-2"></i> Add Seller</a></li>
                <li><a href="" class="nav-link logout"><i class="bi bi-box-arrow-right me-2"></i>logout</a></li>
            </ul>
        </div>
        <main class="main">
            <nav class="nav-bar" ref="nav">
                <div class="bar">
                    <button @click="loadSideBar()" class="btn burger" ><i class="fas fa-bars"></i></button>
                    <input type="text" class="form-control form-search" placeholder="&#xf002; search" style="font-family: Arial, 'Font Awesome 5 Free'" />
                </div>
                <div class="date">
                    <button class="btn">Daily</button>
                    <button class="btn">Monthly</button>
                    <button class="btn">Weekly</button>

                </div>
                <div class="avatar-chat">
                    <button class="btn bell"><i class="bi bi-chat-dots"></i> <span class="">1</span></button>
                    <button class="btn chat"><i class="bi bi-bell"></i><span>1</span></button>
                    <button class="btn avatar"> <span class="name"> Pacharoth</span> <i class="fas fa-user-circle user"></i></button>
                </div>
            </nav>
            <Chat></Chat>
        </main>
    </div>


</template>
<script>
import Chat from './Chat'
export default {
    name:"AdminLayout",
    components:{
        Chat,
    },
    methods:{
        loadSideBar(){
            const nav = this.$refs.nav.classList;
            nav.contains('active')?nav.remove('active'):nav.add('active')
            const sidebar = this.$refs.sidebar.classList;
            sidebar.contains('active')?sidebar.remove('active'):sidebar.add('active');
            const content = this.$ref.content.classList;
            content.contains('active')?content.remove('active'):content.add('active');
        },
        loadChat(){

        }
    }
}
</script>
<style lang="scss" scope>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';

    .body{
        background-color: #F5F5F5;
        margin: 0;
        padding: 0;
        line-height: 1.5;
        font-family: Arial, Helvetica, sans-serif;
    }
    .main{
        width: 100%;
    }
    button{
        &:active{
            border:none;
            i{
                color: $blue_color;
            }
            background-color: #e3eefe;
            color: $blue_color;
            border-radius: 50px;
        }
        &:focus{
            border: none;
            i{
                color: $blue_color;
            }
            background-color: #e3eefe;
            color: $blue_color;
            border-radius: 50px;
        }
    }
    .content{
        display: flex;
        width: 100%;
        cursor: pointer;
        @include breakpoint-down(small){
            // flex-wrap: wrap-reverse;
            flex-direction: column;
            &.active{
                background-color: rgb(65, 63, 63);
            }
        }
    }
    .sidebar{
        order: 2;
        height: 100%;
        animation: slide-down 0.4s ease-in-out;
        background-color: white;
        width: 0;
        display: none;
        box-shadow:$shadow_1;
        animation: slide-left 0.2s ease;
        &.active{
            width: 20%;
            display:block;
            position: absolute;
            color: grey;
            @include breakpoint-down(small){
                // position: relative;
                // margin:0 auto;
                width: 60%;
                // margin-top: 2%;
                
            }

            .logo{
                text-align: center;
                margin-top: 2.5em;
                color: grey;
                font-size: 20px;
                text-decoration: none;
                display: block;
                @include breakpoint-up(medium){
                    margin-top: 2.5rem;
                    font-size: 16px;
                }            
                @include breakpoint-down(medium){
                    margin-top: 3rem;
                    font-size: 16px;
                }
                @include breakpoint-down(small){
                    margin-top: 1rem;
                    font-size: 1rem;
                }
            }
            .close{
                @extend .btn;
                float: right;
                margin-top:0.5em;
                border-radius: 50%;
                display: block;
                color: grey; 
                &:focus{
                    border: none;
                }
                @include breakpoint-down(medium){
                    margin-top: 0.3em;
                }
                @include breakpoint-down(small){
                    margin-top: 0.3em;

                    // display: none;
                }
            }
            .link{
                margin-top: 2.5rem;
                @include breakpoint-down(medium){
                    margin-top: 2rem;
                }
                
                a{
                    color: grey;
                    margin-bottom: 10%;
                    text-decoration: none;
                    border: none;
                    font-weight: bold;

                    &:focus{
                        background-color:  #e3eefe;
                        color: $blue_color;
                        border-radius: 50px;
                    }
                    &:active{
                        background-color:  #e3eefe;
                        color: $blue_color;
                        border-radius: 50px;
                    }
                    &:hover{
                        background-color: #e3eefe;
                        color: $blue_color;
                        border-radius: 50px;
                    }
                    @include breakpoint-down(small){
                        font-size: 0.7rem;
                    }
                    @include breakpoint-up(medium){
                        font-size: 14px;
                    }
                    @include breakpoint-down(medium){
                        font-size: 14px;
                    }
                    &.logout{
                        color: rgba(214, 59, 59, 0.89);
                        &:active{
                            background-color: rgb(243, 190, 190);
                        }
                        &:focus{
                            background-color: rgb(243, 190, 190);
                        }
                    }
                    
                }
            }
            
        }
        @keyframes slide-left {
            0% { opacity: 0; transform: translateX(-100%); } 
            100% { opacity: 1; transform: translateX(0); }
        }
        

    }
    @keyframes slide-down {
        0% { opacity: 0; transform: translateY(-100%); } 
        100% { opacity: 1; transform: translateY(0); }
    }

    .nav-bar{
        order: 1;
        background-color: white;
        width: 100%;
        padding:1% 2% 1% 2%;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.3s all;
        box-shadow: $shadow_1;
        .avatar-chat{
        button{
            color: grey;
        }
        }
        .name{
            &:active{
                background-color: #e3eefe;
                color: $blue_color;
                border-radius: 50px;
                border: none;
            }
            @include breakpoint-down(small){
                display: none;
            }
        }
        .date{
            position: relative;
            button{
                color:grey;
                border-radius: 10px;
                border: none;
                &:active{
                    background-color: $blue_color;
                    color: white;
                }
                &:focus{
                    background-color: $blue_color;
                    color: white;
                }
            }
            @include breakpoint-down(small){
                display: none;
            }
        }
        .bar{
            width: 25%;
            display: flex;
            justify-content: space-between;
            
            .burger{
                @extend .btn;
                border: none;
                color: grey;
                border-radius: 50%;
                &:focus{
                    border: none;
                }
                &:active{
                    color: $blue_color;
                }

            }
            .form-search{
                @extend .form-control;
                width: 70%;
                border: none;
                color: grey;
                border-radius: 50px;
                background-color: #F5F5F5;
                box-shadow: $shadow_1;
                &:focus{
                    color: rgb(66, 66, 66);
                    box-shadow: $shadow_2;
                    background-color: #F5F5F5;
                }
                @include breakpoint-down(small){
                    font-size: 12px;
                }
            }
            @include breakpoint-down(small){
                width: 60%;

            }
        }

        &.active{
            padding-left: 15%;
            @include breakpoint-down(medium){
                padding-left: 14%;
            }
            @include breakpoint-down(small){
                padding-left: 0%;
            }
        }
    }

</style>
<style scope>
    @import 'https://use.fontawesome.com/releases/v5.8.1/css/solid.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.0/css/fontawesome.min.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    @import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css';
</style>