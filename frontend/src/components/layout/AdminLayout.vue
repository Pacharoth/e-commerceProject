<template>
    <div class="content">
        <div class="sidebar " ref="sidebar">
            <button class="btn close" @click="loadSideBar()"><i class="fas fa-times"></i></button>
            <h3 class="text-center"><a href="" class="logo">Admin Dashboard</a></h3>
            <ul class="link nav nav-pill flex-column mb-auto">
                <li class=""><a class="nav-link" href=""><i class="bi bi-house-door me-2"></i>Dashboard</a></li>
                <li ><a href="" class="nav-link"><i class="bi bi-person me-2"></i>Seller</a></li>
                <li ><a href="" class="nav-link"><i class="bi bi-people me-2"></i>Customer</a></li>
                <li ><a href="" class="nav-link"><i class="bi bi-person-plus-fill me-2"></i> Add Seller</a></li>
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
                    <button class="btn bell"><i class="bi bi-chat-dots"></i></button>
                    <button class="btn chat"><i class="bi bi-bell"></i></button>
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
            const content = this.$refs.sidebar.classList;
            content.contains('active')?content.remove('active'):content.add('active')
        }
    }
}
</script>
<style scope>
    @import 'https://use.fontawesome.com/releases/v5.8.1/css/solid.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.0/css/fontawesome.min.css';
    @import '../../assets/sass/admin.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    @import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css';
  

</style>