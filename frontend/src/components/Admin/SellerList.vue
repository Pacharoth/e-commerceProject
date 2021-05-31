<template>
    <div class="seller-container">
        <router-link to="/admin/seller/sellerdetail" class="seller">
            <img src="../../assets/logo.png" alt="">
            <span>Ice cream Store</span>
        </router-link>
        <router-link to="/admin/seller/sellerdetail" class="seller">
            <img src="../../assets/logo.png" alt="">
            <span>Ice cream Store</span>
        </router-link>
        <router-link to="/admin/seller/sellerdetail" class="seller">
            <img src="../../assets/logo.png" alt="">
            <span>Ice cream Store</span>
        </router-link>
        <router-link to="/admin/seller/sellerdetail" class="seller">
            <img src="../../assets/logo.png" alt="">
            <span>Ice cream Store</span>
        </router-link>
        <router-link to="/admin/seller/sellerdetail" class="seller">
            <img src="../../assets/logo.png" alt="">
            <span>Ice cream Store</span>
        </router-link>
        <router-link to="/admin/seller/sellerdetail" class="seller">
            <img src="../../assets/logo.png" alt="">
            <span>Ice cream Store</span>
        </router-link>
        <router-link to="/admin/seller/sellerdetail" class="seller">
            <img src="../../assets/logo.png" alt="">
            <span>Ice cream Store</span>
        </router-link>

    </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';
import {useStore} from 'vuex';
import {getSellers} from '../../hook/seller';
export default {
    title:'Admin Seller',
    name:"SellerList",
    setup() {
        const store = useStore();
        const sellers = computed(()=>store.getters['seller/getSellers']);

        onMounted(async()=>{
            await getSellers(store);
        })
        return{
            sellers
        }
    }
}
</script>
<style lang="scss" scope>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    body{
        background: #F5F5F5;
    }
    .seller-container{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-top:2% ;
        padding-left:6% ;
        margin-top: 5%;
        @include breakpoint-up(large){
            padding-left:7%;
        }
        @include breakpoint-down(medium){
            margin-top:7%; 

        }
        @include breakpoint-down(small){
            margin-top: 12%;
            padding: 2%;
            // justify-content: center;
            margin-left:15% 
            
        }
        .seller{
            @extend .d-flex,.flex-column,.btn;
            background-color:$background_color;
            color: grey;
            justify-content: center;
            margin: 2%;
            &:focus,&:active,&:hover{
                color: rgb(80, 78, 78);
                box-shadow: $shadow_2;
            }
            img{
                margin: 0 auto;
                border-radius: 5px;
                width: 70px;
                height: 70px;
                box-shadow: $shadow_1;
                background: white;
                @include breakpoint-down(medium){
                    width: 60px;
                    height: 60px;
                }
            } 
        }
    }
</style>
