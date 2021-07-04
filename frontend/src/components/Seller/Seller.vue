<template>
    <div class="dashboard-container">
      <nav class="navbar shadow p-2 mb-4 bg-body rounded ">
        <router-link to="/seller" class="navbar-brand"><h4 class="header">AmazingShop</h4></router-link>
        <form class="form-inline">
          <input class="form-control  rounded-pill search" type="search" placeholder="&#xF002; Search"/>
        </form>
        <ul class="nav nav-pills" v-if="sellerpage=='sellerreport'||sellerpage=='sellerpage'">
          <li class="nav-item ">
            <a @click="daily()" class="nav-link header report"  href="#">Daily</a>
          </li>
          <li class="nav-item ">
            <a @click="monthly()" class="nav-link header report" href="#">Monthly</a>
          </li>
          <li class="nav-item ">
            <a @click="yearly()" class="nav-link header report" href="#">Yearly</a>
          </li>
        </ul>

        <!-- notification -->
        
        <ul class="nav ">

          <li class="nav-item"> 
            <a href="#" class="nav-link icon" @click="showChatList">
              <em class='fas fa-comment-dots'></em>
              <!-- <span class="badge rounded-pill badge-notification bg-danger">1</span> -->
            </a>          
          </li>
          <li class="nav-item">  
            <a href="#" class="nav-link icon" @click="showNotification">
              <em class="fas fa-bell"></em>
              <!-- <span class="badge rounded-pill badge-notification bg-danger">1</span> -->
            </a>          
          </li>
          <li class="nav-item dropdown" @click="showProfile">
            
            <a class="nav-link dropdown-toggle icons" data-toggle="dropdown" href="#" role="button" >
              <!-- <em class="fas fa-user-circle user" style="margin-right: 8%;
              font-size: 1.5vw;"></em> -->
              <img class=" profile-img" :src="'http://localhost:3000'+user.img" alt="">

              {{user.user}}
            </a>
            <div class="dropdown-menu profile" ref="profile">
                <router-link to="/seller/sellerprofile" class="dropdown-item header" href="#">My profile</router-link>
                <router-link to="/" class="dropdown-item header" >Homepage</router-link>
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
import axios from 'axios';
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
        // user:{},
        initialize:[],
      }
    },
    components:{
        ChatList,
        Notification
    },
    computed:{
      user(){
        return this.$store.getters['auth/getSession'];
      },
      sellerpage(){
        return this.$route.name;
      }
    },
    async mounted() {
       const  res = await axios.get("http://localhost:3000/getSaleInfo/"+localStorage.getItem('userid'));
        console.log("sale info", res)
        this.initialize=res.data;
        this.$store.dispatch('seller/loadStatistic',res.data);
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
       async daily(){
         const  res = await axios.get("http://localhost:3000/getSaleInfo/"+localStorage.getItem('userid'));
         console.log("sale info", res)
         this.$store.dispatch('seller/loadStatistic',res.data);
      },
      async monthly(){
          const  res = await axios.get("http://localhost:3000/getMonthlySale/"+localStorage.getItem('userid'));
          console.log("sale info monthly ", res)
          this.$store.dispatch('seller/loadStatistic',res.data);
      },
      async yearly(){
        const  res = await axios.get("http://localhost:3000/getYearlySale/"+localStorage.getItem('userid'));
        console.log("sale info yearly", res)
        this.$store.dispatch('seller/loadStatistic',res.data);
      }
     
    
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
.profile-img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: $shadow_1;
  
}
.icons{
  border-radius: 50px;
  color: rgb(83, 80, 80);
  font-weight: 500;
  &:focus,&:hover{
    color: #f165a7;
    background-color: #f165a662;
  }
}
.icon{
    color: #d60265;
    border-radius: 50%;
  &:focus,&:hover{
    color: #f165a7;
    background-color: #f165a662;
  }
}
.report{
  box-shadow: $shadow_1;
  color: rgb(92, 91, 91);
  margin-left: 5%;
  background-color: #eee;
  font-weight: bold;
  &:hover,&:focus{
    color: white;
    background-color: #f165a7;
  }
  
}
// .nav-link:active {
//   background-color: #c9adba;
// }
// .nav-link:focus {
//   background-color: #f165a7;
// }
.form-control {
  border: 1px solid #d60265;
}
.search {
  border:none;
  box-shadow: $shadow_1;
  background-color: #eee;
  font-family: Arial, FontAwesome;
  &:hover,&:focus{
    box-shadow: $shadow_2;
  background-color: #eee;

  }
}
.search::placeholder {
  // color: #d60265;
  color: gray;
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
  color: #eee;
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