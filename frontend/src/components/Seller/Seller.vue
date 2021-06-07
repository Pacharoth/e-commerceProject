<template>
    <div class="dashboard-container">
            <nav class="navbar shadow p-3 mb-5 bg-body rounded ">
        <router-link to="/seller" class="navbar-brand"><h4 class="header">AmazingShop</h4></router-link>
        <form class="form-inline">
          <input class="form-control mr-sm-2 rounded-pill search" type="search" placeholder="&#xF002; Search"/>
        </form>
        <ul class="nav nav-pills">
          <li class="nav-item ">
            <a class="nav-link header"  href="#">Daily</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link header" href="#">Monthly</a>
          </li>
          <li class="nav-item ">
            <a class="nav-link header" href="#">Yearly</a>
          </li>
        </ul>

        <!-- notification -->
        
        <ul class="nav ">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle header" @click="showDropdown" ref="drop" data-toggle="dropdown" href="#" role="button" >
              <em class="fa fa-shopping-bag header" ></em>
              <span class="badge rounded-pill badge-notification bg-danger">1</span>
            </a>
            <div class="dropdown-menu customerOrder" ref="drop">
                <h3 class="dropdown-header">Customers Orders</h3>
                <a class="dropdown-item header" href="#">
                    <div class="row">
                      <div class="col-md-9">
                        <span class="customer">CustomerName</span>
                        <span class="productOrdered">productName</span>
                        <span class="productOrdered">productSize</span>
                        <p>+855 11223344</p>
                      </div>
                      <div class="col-md-1">
                        <span><button class="btn btn-secondary">Reject</button></span>
                        <span><button class="btn opt">Accept</button></span>
                      </div>
                    </div> 
                </a>
                <a class="dropdown-item header" href="#"> 
                    <div class="row">
                      <div class="col-md-9">
                        <span class="customer">CustomerName</span>
                        <span class="productOrdered">productName</span>
                        <span class="productOrdered">productSize</span>
                        <p>+855 11223344</p>
                      </div>
                      <div class="col-md-1">
                        <span><button class="btn btn-secondary">Reject</button></span>
                        <span><button class="btn opt">Accept</button></span>
                      </div>
                    </div> 
                </a>
            </div>
            </li>
          <li class="nav-item"> 
            <a href="#" class="nav-link" @click="showChatList">
              <em class='fas fa-comment-dots header'></em>
              <span class="badge rounded-pill badge-notification bg-danger">1</span>
            </a>          
          </li>
          <li class="nav-item">  
            <a href="#" class="nav-link" @click="showNotification">
              <em class="fas fa-bell header"></em>
              <span class="badge rounded-pill badge-notification bg-danger">1</span>
            </a>          
          </li>
          <li class="nav-item dropdown" @click="showProfile">
            <a class="nav-link dropdown-toggle header" data-toggle="dropdown" href="#" role="button" >
              <em class="fas fa-user-circle user" style="margin-right: 8%;
              font-size: 1.5vw;"></em>{{user.username}}
            </a>
            <div class="dropdown-menu profile" ref="profile">
                <router-link to="/seller/sellerprofile" class="dropdown-item header" href="#">My profile</router-link>
                <a class="dropdown-item header" href="#">Setting</a>
                <router-link class="dropdown-item header" @click="logout" to="/">Log out</router-link>
            </div>
            </li>
        </ul>
    </nav>
    <router-view></router-view>
    <chat-list/>
    <notification/>
    </div>

</template>
<script>
import { useStore } from 'vuex';
import { showChatLists, showNotifications } from '../../hook/effect';
import { logouts } from '../../utils/FormValidation';
import Notification from '../Admin/Notification.vue';
import ChatList from '../Chat/ChatList.vue';
export default {
    name:'Seller',
    setup() {
      const store = useStore();
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
      return{
        showChatList,
        showNotification,
        logout,
      }
    },
    data() {
      return {
        user:{},
      }
    },
    components:{
        ChatList,
        Notification
    },
    mounted() {
      this.user.username= localStorage.getItem("username");
      this.user.userid = localStorage.getItem("userid");
    },
    methods: {
      showDropdown(){
        const dropdown = this.$refs.drop.classList;
        dropdown.contains('show')?dropdown.remove('show'):dropdown.add('show');
      },
      showProfile(){
        const dropdownProfile = this.$refs.profile.classList;
        dropdownProfile.contains('show')?dropdownProfile.remove('show'):dropdownProfile.add('show');
      },
    
     
    
    },
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    .header {
  color: #d60265;
}
.nav-link:active {
  background-color: #f165a7;
}
.nav-link:focus {
  background-color: #f165a7;
}
.form-control {
  border: 1px solid #d60265;
}
.search {
  font-family: Arial, FontAwesome;
}
.search::placeholder {
  color: #d60265;
}
.dropdown-toggle::after {
  content: none;
}
.dropdown-header {
  color: #d60265;
  font-size: 20px;
  font-weight: 900;
}
.btn.opt {
  background-color: #d60265;
  color: white;
}
.profile{
  left: 0;
}
.customerOrder {
  left: auto;
  right: 0;
  width: 650px;
}
.productOrdered {
  color: black;
}

</style>