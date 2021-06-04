<template>
    <div class="content" ref="content">
                <main class="main">
            <nav class="nav-bar" ref="nav">
                <div class="bar">
                    <button @click="loadSideBar()" class="btn burger" ><em class="fas fa-bars"></em></button>
                    <input type="text" class="form-control form-search" placeholder="&#xf002; search" style="font-family: Arial, 'Font Awesome 5 Free'" />
                </div>
                <div class="date">
                    <button class="btn">Daily</button>
                    <button class="btn">Monthly</button>
                    <button class="btn">Weekly</button>

                </div>
                <div class="avatar-chat">
                    <button class="btn bell" @click="showChatList"><em class="bi bi-chat-dots" ></em> <span class="">1</span></button>
                    <button class="btn chat" @click="showNotification"><em class="bi bi-bell"></em><span>1</span></button>
                    <button class="btn avatar"> <span class="name">{{user.user}}</span> <em class="fas fa-user-circle user"></em></button>
                </div>
            </nav>
            <chat-list/>
            <notification/>
            <router-view></router-view>
        </main>
        <div class="sidebar " ref="sidebar">
            <button class="btn close" @click="loadSideBar()"><em class="fas fa-times"></em></button>
            <h3 class="text-center"><router-link to="/admin" class="logo">Admin Dashboard</router-link></h3>
            <ul class="link nav nav-pill flex-column mb-auto">
                <li class=""><router-link to="/admin" class="nav-link" ><em class="bi bi-house-door me-2"></em>Dashboard</router-link></li>
                <li class=""><router-link to="/" class="nav-link" ><em class="bi bi-house-door me-2"></em>Homepage</router-link></li>
                <li class=""><router-link to="/seller" class="nav-link" ><em class="bi bi-house-door me-2"></em>Sellerpage</router-link></li>
                <li ><router-link to="/admin/seller" class="nav-link"><em class="bi bi-person me-2"></em>Seller</router-link></li>
                <li><router-link to="/admin/category" class="nav-link"><em class="fas fa-list-alt me-2"></em>Category</router-link></li>
                <li ><router-link to="/admin/customer" class="nav-link"><em class="bi bi-people me-2"></em>Customer</router-link></li>
                <li ><router-link to="/admin" class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal"><em class="bi bi-person-plus-fill me-2"></em> Add Seller</router-link></li>
                <li><router-link to="/" @click="logout" class="nav-link logout" ><em class="bi bi-box-arrow-right me-2"></em>logout</router-link></li>
            </ul>
        </div>

        <seller-register/>
    </div>


</template>
<script>
import ChatList from '../Chat/ChatList'
import SellerRegister from '../Admin/SellerRegister'
import {Modal} from 'bootstrap';
import Notification from '../Admin/Notification';
import { ref } from '@vue/reactivity';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import {showChatLists,showNotifications} from '../../hook/effect';
import {logouts} from '../../utils/FormValidation'
export default {
    title:'Admin',
    name:"AdminLayout",
    components:{
        ChatList,
        SellerRegister,
        Notification
    },
    setup() {
        const store= useStore(); //this.$store
        const modal = ref(null); //this.$ref.modal
        const nav =ref(null); //this.$ref.nav
        const sidebar = ref(null); 
        
        const user = computed(()=>store.getters['auth/getSession'])
        onMounted(()=>{
            var modal=new Modal(modal)
        })
        function loadSideBar(){
            let nes  =nav.value.classList;
            nes.contains('active')?nes.remove('active'):nes.add('active');
            let side = sidebar.value.classList;
            side.contains('active')?side.remove('active'):side.add('active');
        }
        function showChatList(){showChatLists(store)}
        function showNotification(){showNotifications(store)}
        function logout(){
            store.dispatch('chat/changeList','');
            store.dispatch('notification/changeContent','');
            logouts(store);
            
        }
        return{
            //data
            nav,
            sidebar,
            modal,
            //computed
            user,
            //method
            showNotification,
            showChatList,
            loadSideBar,
            logout,
        }
    },
}
</script>
<style lang="scss" scope>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import 'https://use.fontawesome.com/releases/v5.8.1/css/solid.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css';
    @import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css';

    .body{
        margin: 0;
        padding: 0;
        line-height: 1.5;
        font-family: Arial, Helvetica, sans-serif;
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
    .main{
        width: 100%;
        .content-main{
            transition: 0.3s all;

            &.active{
                padding-left: 20%;
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
            // position: fixed;
            position: fixed;
            color: grey;
            @include breakpoint-down(small){
                width: 60%;
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

    .nav-bar:not([data-scroll='0']){

        position: fixed;
        order: 2;
        background-color: white;
        width: 100%;
        padding:1% 2% 1% 2%;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.3s all;
        box-shadow: $shadow_1;
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
            box-shadow: none;
        }
    }
        .avatar-chat{
        button{
            color: grey;
            &:focus{
                box-shadow: none;
                color: $blue_color;
            }
        }
        }
        .name{
            &:focus{
                background-color: #e3eefe;
                color: $blue_color;
                border: none;
            }
            @include breakpoint-down(small){
                display: none;
            }
        }
        .date{
            display: flex;
            button{
                font-weight: bold;
                margin-right: 2%;
                color:grey;
                border-radius: 5px;
                background-color: #F5F5F5;
                box-shadow: $shadow_2;
                border: none;
                &:active{
                    background-color: $blue_color;
                    color: white;
                }
                &:focus{
                    box-shadow: $shadow_2;
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
                &.active{
                    display: block;
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
