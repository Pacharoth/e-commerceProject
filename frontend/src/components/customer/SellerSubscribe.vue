<template>
    <div class="container-subscription">
        <h3>Choose Your Plan to subscribe as Seller</h3>
        <div class="plan-container">
            <div v-if="!user.userid" class="payment-container">
                <h5>Free trial</h5>
                <div class="line-pp"></div>
                <h4>Free</h4>
                <ul>
                    <li>valid 7 days</li>
                    <li>No support technical</li>
                    <li>CRUD Product</li>
                    <li>Sell Product</li>
                </ul>
                <button class="register-seller" @click="registerSeller(
                    0,
                    'free'
                )" data-bs-toggle="modal" data-bs-target="#sellerModal">Get Start</button>
            </div>
            <div class="payment-container">
                <h5>Monthly</h5>
                <div class="line-pp"></div>
                <h4>${{month}}</h4>
                <ul>
                    <li>valid a month + 10days</li>
                    <li>Support technical</li>
                    <li>Include Free Function</li>
                    <li>Boost Product</li>
                </ul>
                <button class="register-seller" @click="registerSeller(
                    month,
                    'month'
                )"  data-bs-toggle="modal" data-bs-target="#sellerModal">Get Start</button>

            </div>
            <div class="payment-container">
                <h5>Annually</h5>
                <div class="line-pp"></div>
                <h4>${{year}}</h4>
                <ul>
                    <li>valid 1 year 30 days</li>
                    <li>Support technical</li>
                    <li>Include Free Function</li>
                    <li>Boost Product</li>
                </ul>
                <button class="register-seller" @click="registerSeller(
                    year,
                    'year'
                    )" data-bs-toggle="modal" data-bs-target="#sellerModal">Get Start</button>
            </div>
        </div>
        <form-register-payment :value="value" :type="type"/>
    </div>
</template>
<script>
import { ref } from '@vue/reactivity'
import FormRegisterPayment from './FormRegisterPayment.vue';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
export default {
  components: { FormRegisterPayment },
    name:"SellerSubscribe",
    title:"Seller Plan",
    setup() {
        const year = ref(162),
        month=ref(15),
        type=ref(""),
        store = useStore(),
        user = computed(()=>store.getters['auth/getSession']),
        value = ref(0);
        function registerSeller(values,types){
        
            value.value=values;
            type.value= types;
        }
        return{
            year,
            month,
            registerSeller,
            value,
            type,
            user,
        }
    },
    
}
</script>
<style lang="scss" scope>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .container-subscription{
        width: 100%;
        padding:2% ;
        display: flex;
        flex-direction: column;
        h3{
            margin: auto;
        }
        .plan-container{
            display: flex;
            width: 100%;
            justify-content:center;
            padding: 5%;
            flex-wrap: wrap;
            .payment-container{
                margin:auto;
                margin-left:2% ;
                margin-right:2% ;
                display: block;
                width: 25%;
                border-radius: 5px;
                background-color: white;
                box-shadow: $shadow_1;
                padding-left: 2%;
                padding-top: 2%;
                padding-right: 2%;
                padding-bottom: 1%;
                margin-bottom: 2%;
                @include breakpoint-down(small){
                    padding: 2%;
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                }
                .line-pp{
                    border-bottom: 2px solid #D60265;
                    width: 40%;
                    @include breakpoint-down(small){
                        display: none;
                    }
                }
                h4{
                    font-weight: bold;
                    margin-top: 5%;
                    @include breakpoint-down(small){
                        margin-top: 0;
                    }
                }
                ul{
                    margin-top: 10%;
                    width: 100%;
                    margin: auto;
                    margin-bottom: 5%;
                    @include breakpoint-down(small){
                        display: none;
                    }
                }
                .register-seller{
                    margin-top: 5%;
                    @extend .btn;
                    background:#D60265 ;
                    color: white;
                    border:none;
                    width: 100%;
                    font-weight: bold;
                    &:hover,&:focus{
                        color: white;
                        box-shadow: $shadow_1;
                    }
                    @include breakpoint-down(small){
                        margin-top: 0;
                        width: 30%;
                    }
                }               
            }
            
        }

    }
    
</style>