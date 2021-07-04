<template>
    <div class="dashboard-card" >
        <div class="card-one" >
            <div class="logo" >
                <button class="user">
                <em v-if="title=='Admin'" class="fas fa-user"></em>
                <em v-if="title=='Seller'" class="bi bi-box"></em>
                </button>
            </div>
            <div class="text">
                <span class="title" v-if="statistic.saleUnit&&title=='Seller'">{{statistic.saleUnit}}</span>
                <span class="title" v-if="admin.sellers&&title=='Admin'">{{admin.sellers}}</span>
                <span v-if="title=='Admin'" class="content-text">Total Register</span>
                <span v-if="title=='Seller'" class="content-text">Total sale unit</span>
            </div>
        </div>
        <div class="card-one">
            <div class="logo">
                <button class="chart">
                <em class="fas fa-chart-bar icon"></em>
                </button>
            </div>
            <div class="text">
                <span class="title" v-if="statistic.totalEarn&&title=='Seller'">${{statistic.totalEarn}}</span>
                <span class="title" v-if="earning&&title=='Admin'">${{earning}}</span>
                <span class="content-text">Total Earning</span>
            </div>
        </div>
        <div class="card-one">
            <div class="logo">
                <button class="money">
                <em class="fas fa-dollar-sign icon"></em>
                </button>
            </div>
            <div class="text">
                <span class="title" v-if="statistic.totalPro&&title=='Seller'">${{statistic.totalPro}}</span>
                <span class="title" v-if="profit&&title=='Admin'">${{profit}}</span>
                <span class="content-text">Total Profit</span>
            </div>
        </div>
        <div class="card-one">
            <div class="logo">
                <button class="wallet">
                <em class="fas fa-wallet icon"></em>
                </button>
            </div>
            <div class="text">
                <span class="title" v-if="statistic.yearPro&&title=='Seller'">${{statistic.yearPro}}</span>
                <span class="title" v-if="payment&&title=='Admin'">${{payment}}</span>
                <span class="content-text" v-if="title=='Seller'">This year profit</span>
                <span class="content-text" v-else>Total Payment</span>
            </div>
        </div>
        
    </div>
</template>
<script>
import { computed, ref, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    name:'CardDashboard',
    props:['title'],
    computed:{
        statistic(){
            return this.$store.getters['seller/getStatistic'];
        },
       
    },
    setup() {
        const store=useStore(),
        earning=ref(0),
        profit=ref(0),
        payment=ref(0),
        admin = computed(()=>store.getters['admin/getData']);
        watch(admin,async()=>{
            if(admin.value.result.length==0){
                earning.value =0
                profit.value =0
                payment.value = 0
            }   
            else if(admin.value.result.length==1){
                earning.value=admin.value.result[0].totalEarning
                profit.value=admin.value.result[0].totalProfile
                payment.value=admin.value.result[0].totalPayment;
                
            }else if(admin.value.result.length>1){
                for(var i in admin.value.result){
                    console.log(i)
                }
            }
        })
        return{
            admin,
            earning,
            payment,
            profit,
        }
    }

}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import '../../assets/sass/carddasboard';
    .dashboard-container{
        .dashboard-card{
            
            @include card_dashboard;
        }   
    }
</style>