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
                <span class="content-text">This year profit</span>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'CardDashboard',
    props:['title'],
    computed:{
        statistic(){
            return this.$store.getters['seller/getStatistic'];
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