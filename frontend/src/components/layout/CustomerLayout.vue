<template>
    <div class="customer-dashboard">
        <div class="nav_bar shadow p-2 mb-2 bg-body rounded">
                <div class="d-flex bd-highlight ">
                    <router-link to="/" class="me-auto p-1 bd-highlight text-decoration-none"><h4 class="name">AmazingShop</h4></router-link>
                    <div class="p-2 bd-highlight">
                        <button v-if="user.role =='customer'||user.role=='admin'||user.role=='seller'" 
                        class="btn chat p-0" @click="showChatList"
                        ><em class="fas fa-comment-dots"></em>
                        </button>
                    </div>
                    <div class="p-2 bd-highlight d-flex justify-content-between">

                         <input type="text" ref="search" v-model="searchname"  class="form-control form-search" placeholder="&#xf002; search" style="font-family: Arial, 'Font Awesome 5 Free'" />
                        <button class="btn search p-0" @click="showSearch" ><em class="fas fa-search" ></em></button>

                    </div>
                    
                    <div class="p-2 bd-highlight">
                        <div class="dropdown">
                            <button v-if="user.role =='customer'||user.role=='admin'||user.role=='seller'" 
                            class="btn dropdown-toggle p-0" type="button" 
                            id="dropdownMenuButton1" data-bs-toggle="dropdown"
                            aria-expanded="false">
                                <em class="fas fa-user-circle user"></em>{{user.user}}
                            </button>
                            <button v-else class="btn p-0 signin" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="setStatus('signin')">Sign in</button>
                            <ul class="dropdown-menu"
                            v-if="user.role =='customer'||user.role=='admin'||user.role=='seller'"
                            aria-labelledby="dropdownMenuButton1">
                            <li><router-link to="/pastorder" class="dropdown-item" >My Ordered</router-link></li>
                            <li><router-link to="/edituser" class="dropdown-item">Profile</router-link></li>
                            <li><router-link to="/" @click="logout" class="dropdown-item" href="#">Log Out</router-link></li>
                            <li v-if="user.role=='admin'"><router-link to="/admin" class="dropdown-item">Admin</router-link></li>
                            <li v-if="user.role=='seller'||user.role=='admin'"><router-link to="/seller" class="dropdown-item">Seller</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <login-signup/>
                    <div class="p-2 bd-highlight">
                        <router-link v-if="user.role =='customer'||user.role=='admin'||user.role=='seller'" 
                        to="/shoppingcart" class=" cart">
                            <em class="fas fa-shopping-cart"></em>
                        </router-link>
                    </div>
                </div>
                
            </div>
        <router-view></router-view>
        <div class="clas">
            <chat-list/>
        </div>
    </div>
    

</template>

<script>
import { useStore } from 'vuex'
import { showChatLists, showNotifications } from '../../hook/effect'
import { logouts } from '../../utils/FormValidation'
import {ref} from '@vue/reactivity'

import ChatList from '../Chat/ChatList.vue'
import LoginSignup from '../customer/LoginSignup.vue'
import { watch } from '@vue/runtime-core'
import router from '../../routers/route'
import axios from 'axios';
import {localhost} from '../../utils/FormValidation.js';
export default {
    name:"CustomerLayout",
    setup() {
        const searchname = ref("");
        const store = useStore()
        function showChatList(){
            showChatLists(store);
        }
        function showNotification(){
            showNotifications(store);
        }
        function logout(){
            logouts(store);
            store.dispatch('chat/changeList','');
            store.dispatch('notification/changeContent','');
        }
        watch(searchname,async()=>{
            router.push({name:'customerlistproduct',query:{q:searchname.value}});
            await axios.get(localhost+"search/product?q="+searchname.value).then(result=>{
                console.log(result);
            });
        })
      
        return{
            showChatList,
            showNotification,
            logout,
            searchname
        }
    },
    data() {
        return {
            modal:null,
            carousel:null,
        }
    },
    components:{
        ChatList,
        LoginSignup,
    },
    computed:{
        user(){
           return this.$store.getters['auth/getSession']
        }
    },
    methods: {
        slideDown(){
            const slidedown = this.$refs.dropdown.classList
            slidedown.contains("show")?slidedown.remove('show'):slidedown.add('show');
        },
        setStatus(status){
            const store = this.$store
            store.dispatch('auth/setStatus',status);
        },
        showSearch(){
            const search = this.$refs.search.classList
            search.contains('active')?search.remove('active'):search.add('active')
        },
    },
    mounted() {
        // this.carousel = new Carousel(this.$refs.Carousel);
    },
    
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css';
    @import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css';
    .name{
        color: #D60265;
    }
    .cart{
        color: #D60265;
        font-size: 100%;
        text-align: right;
        margin-right: 2%;
        /* margin-left: 2%; */
    }
    .dropdown{
        /* height: 100%; */
        text-align: right;
        /* margin-top: 0; */
        
    }
    .user{
        color: #D60265;
        margin-right: 8%;
        font-size: 150%;
    }
    .search{
        color: #D60265;
        text-align: right;
        /* font-size: 1.5vw; */
    
    }
    .chat{
        /* font-size: 1.5vw; */
        color: #D60265;
        text-align: right;
    }
    .signin{
        color: #D60265;
        font-weight: bold;
    }
    .form-search{
        @extend .form-control;
        display: none;
        width: 90%;
        border: none;
        color: grey;
        border-radius: 50px;
        background-color: #F5F5F5;
        box-shadow: $shadow_1;
        transition: 0.4 ease;
        &.active{
            display: block;
        }
        &:focus{
            color: rgb(66, 66, 66);
            box-shadow: $shadow_2;
            background-color: #F5F5F5;
        }
        @include breakpoint-down(small){
            font-size: 12px;
        }
    }

</style>
