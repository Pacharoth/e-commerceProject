<template>
    <div class="nav_bar shadow p-2 mb-5 bg-body rounded">

        <div class="d-flex bd-highlight ">
            <div class="me-auto p-1 bd-highlight"><h4 class="name">AmazingShop</h4></div>
            
            <div class="p-2 bd-highlight">
                <div class=" chat"><i class="far fa-comment-dots"></i></div>
            </div>
             <div class="p-2 bd-highlight">
                <div class=" search"><i class="fas fa-search"></i></div>
            </div>
            
            <div class="p-2 bd-highlight">
                <a class="signin" href="">SIGN IN</a>
            </div>
           
            <div class="p-2 bd-highlight">
                <div class=" cart">
                    <i class="fas fa-shopping-cart"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

</script>

<style scoped>
    .name{
        color: #D60265;
    }
    .cart{
        color: #D60265;
        font-size: 100%;
        text-align: right;
        margin-right: 2%;
    }
    .dropdown{
        text-align: right;
    }
    .signin{
        color: #D60265;
        text-decoration: none;
        font-weight: bold;
    }
    .search{
        color: #D60265;
        text-align: right;
    }
    .chat{
        color: #D60265;
        text-align: right;
    }
</style>
