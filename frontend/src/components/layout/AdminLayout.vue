<template>
    <div class="content">
        <div class="sidebar" ref="sidebar">
            <button class="btn close" @click="loadSideBar()"><i class="fas fa-times"></i></button>
            <h2><a href="">Admin DashBoard</a></h2>
            <ul>
                <a href="">Hello</a>
            </ul>
        </div>
        <nav class="shadow-sm nav-bar" ref="nav">
            <div class="bar">
                <button @click="loadSideBar()" class="btn burger" ><i class="fas fa-bars"></i></button>
                <input type="text" class="form-control form-search" placeholder="&#xF002; search" style="font-family: Arial, 'Font Awesome 5 Free'" />
            </div>
            <div class="date">
                <button class="btn">Daily</button>
                <button class="btn">Monthly</button>
                <button class="btn">Weekly</button>

            </div>
            <div class="avatar-chat">
                <button><i class="far fa-comment"></i></button>
            </div>
        </nav>
    </div>


</template>
<script>
export default {
    name:"AdminLayout",
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

</style>