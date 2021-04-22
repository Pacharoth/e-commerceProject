<template>

    <div class="customer-dashboard">
            <div class="nav_bar shadow p-2  bg-body rounded">

            <div class="d-flex bd-highlight ">
                <div class="me-auto p-1 bd-highlight"><h4 class="name">AmazingShop</h4></div>
                <div class="p-2 bd-highlight">
                    <div class=" chat"><em class="far fa-comment-dots"></em></div>
                </div>
                <div class="p-2 bd-highlight">
                    <div class=" search"><em class="fas fa-search"></em></div>
                </div>
                
                <div class="p-2 bd-highlight">
                    <div class="dropdown">
                        <button class="btn dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" @click="slideDown">
                            <em class="fas fa-user-circle user"></em>Ginzy
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" ref="dropdown">
                        <li><router-link to='/postorder' class="dropdown-item" href="#">My Ordered</router-link></li>
                        <li><router-link to="/edituser" class="dropdown-item" href="#">Profile</router-link></li>
                        <li><router-link to="/" class="dropdown-item" href="#">Log Out</router-link></li>
                        </ul>
                    </div>
                </div>
            
                <div class="p-2 bd-highlight">
                    <router-link to="/shoppingcart" class=" cart">
                        <em class="fas fa-shopping-cart"></em>
                    </router-link>
                </div>
            </div>
            
        </div>
        <router-view></router-view>
    </div>
    

</template>

<script>
// import {Modal,Carousel} from 'bootstrap';
export default {
    name:"CustomerLayout",
    data() {
        return {
            modal:null,
            carousel:null
        }
    },
    methods: {
        slideDown(){
            const slidedown = this.$refs.dropdown.classList
            slidedown.contains("show")?slidedown.remove('show'):slidedown.add('show');
        }
    },
    mounted() {
        // this.modal=new Modal(this.$refs)
        // this.carousel = new Carousel(this.$refs)
    },
    
}
</script>
<style scoped>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css';
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

</style>