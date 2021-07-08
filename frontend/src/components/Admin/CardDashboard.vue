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
                <span class="title" v-if="earning&&title=='Admin'">${{earning.toFixed(2)}}</span>
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
                <span class="title" v-if="profit&&title=='Admin'">${{profit.toFixed(2)}}</span>
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
                <span class="title" v-if="payment&&title=='Admin'">${{payment.toFixed(2)}}</span>
                <span class="content-text" v-if="title=='Seller'&&status==''">This year profit</span>
                <span class="content-text" v-else-if="status!==''&&title=='Seller'">Total Payment</span>
                <span class="content-text" v-else>Total Payment</span>
            </div>
        </div>
        
    </div>
</template>
<script>
import { computed, onMounted, ref, watch } from '@vue/runtime-core';
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
        admin = computed(()=>store.getters['admin/getData']),
        status=computed(()=>store.getters['admin/getStatus'])
        watch(admin,async()=>{
            resetToZero();
              for(var i in admin.value.result){
                    earning.value+=admin.value.result[i].totalEarning
                    profit.value+=admin.value.result[i].totalProfile
                    payment.value+=admin.value.result[i].totalPayment
                }
        })
        onMounted(()=>{
            resetToZero();
            for(var i in admin.value.result){
                earning.value+=admin.value.result[i].totalEarning
                profit.value+=admin.value.result[i].totalProfile
                payment.value+=admin.value.result[i].totalPayment
            }
        })
        function resetToZero(){
            earning.value=0
            profit.value=0
            payment.value=0
        }
        return{
            admin,
            earning,
            payment,
            profit,
            status
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