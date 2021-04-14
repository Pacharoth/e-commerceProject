<template>
        <div class="nav_bar shadow p-3 mb-5 bg-body rounded">
        <div class="row">
            <div class="col"><h4 class="name">AmazingShop</h4></div>
            <div class="col chat"><i class="far fa-comment-dots"></i></div>
            <div class="col-custom search"><i class="fas fa-search"></i></div>
            <div class="col-custom-2">
                <div class="dropdown">
                    <button class="btn dropdown-toggle p-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" @click="slideDown">
                        <i class="fas fa-user-circle user"></i>Ginzy
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" ref="dropdown">
                      <li><a class="dropdown-item" href="#">My Ordered</a></li>
                      <li><a class="dropdown-item" href="#">Profile</a></li>
                      <li><a class="dropdown-item" href="#">Log Out</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-custom cart">
                <i class="fas fa-shopping-cart"></i>
            </div>
        </div>
    </div>
    
        
</template>

<script>

export default {
    name:"Navigation",
    methods: {
        slideDown(){
            const slidedown = this.$refs.dropdown.classList
            slidedown.contains("show")?slidedown.remove('show'):slidedown.add('show');
        }
    },
}
</script>
<style scoped>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css';

    .name{
        color: #D60265;
    }
    /* .dropdown-menu .active{
        display: block;
    } */
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
        margin-top: 0;
        
    }
    .user{
        color: #D60265;
        margin-right: 8%;
        font-size: 1.5vw;
    }
    .col-custom{
        flex: 0 0 4.16666%;
        max-width: 4.16666%;
    }
    .col-custom-2{
        flex: 0 0 8.3333%;
        max-width: 8.3333%;
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