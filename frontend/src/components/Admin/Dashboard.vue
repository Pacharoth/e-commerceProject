<template>
    <div class="dashboard-container" >
        
        <div class="dashtitle-gen">
            <h4 v-if="title=='Admin'">Dashboard</h4>
            <h4 v-if="title=='Seller'">Seller</h4>
            <button class="btn btn-primary">Generate Report</button>
        </div>
        <!-- card -->
        <div class="dashboard-card" >
            <div class="card-one" >
                <div class="logo" >
                    <button class="user">
                    <em v-if="title=='Admin'" class="fas fa-user"></em>
                    <em v-if="title=='Seller'" class="bi bi-box"></em>
                    </button>
                </div>
                <div class="text">
                    <span class="title">2830</span>
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
                    <span class="title">$2830</span>
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
                    <span class="title">$2830</span>
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
                    <span class="title">$2830</span>
                    <span class="content-text">This year profit</span>
                </div>
            </div>
            
        </div>
        <!-- endcard -->
        <div class="dashboard-graph">
            <div class="dashboard-gmy">
                <span class="earning">Earning Statistics</span>
                <div class="month-year">
                    <button class="btn active">Monthly</button>
                    <button class="btn active">Weekly</button>
                </div>
            </div>
            <div class="chart-container ">
                <canvas ref="chart"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
import Chart from 'chart.js/auto';
import linegraph from '../chart/chartline';
export default {
    name:"Dashboard",
    props:['title'],
    title:'Dashboard',
    data(){
        return{
            chartdata:linegraph,
            title_dashboard:this.title,
        }
    },
    mounted() {
        const chart= this.$refs.chart;
        new Chart(chart,this.chartdata);
        
    },
    methods:{
        
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .dashboard-container {
        margin-top:4% ;
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 2%;   
        transition: 0.3s all;
        @include breakpoint-down(medium){
            margin-top: 7%;
        }
        @include breakpoint-down(small){
            margin-top: 10%;
        }
        .dashtitle-gen{
            padding: 1%;
            display: flex;
            width: 100%;
            justify-content: space-between;
            h4{
                cursor: pointer;
                color: grey;
                font-size: 2rem;
                font-weight: bold;
                @include breakpoint-down(small){
                    font-size: 1.4rem;
                }
            }
            button{
                
                @include breakpoint-down(small){
                    font-size: 12px;

                }
                box-shadow: $shadow_1;
                font-weight: bold;
                background-color: $blue_color;
                border: none;
                color: white;
                &:focus{
                    box-shadow: $shadow_2;
                }
            }
        }
        //card
        .dashboard-card{
            width: 100%;
            display: flex;
            justify-content: space-between;
            // padding: 2%;
            padding-bottom:2% ;
            flex-wrap: wrap;
            align-items: center;
    
            @include breakpoint-down(medium){
                flex-wrap: wrap;
            }   
            @include breakpoint-down(small){
                // flex-direction: column;
                justify-content: center;
            }
            
            .card-one{
                border-radius: 10px;

                display: flex;
                align-items: center;
                width: 24%;
                padding: 20px;
                padding-top: 30px;
                padding-bottom: 30px;
                background-color: white;
                box-shadow: $shadow_1;
                justify-content: space-around;
                transition: 0.4s all;
                @include breakpoint-up(large){
                    width: 48%;
                    margin-top: 3%;
                }
                @include breakpoint-down(medium){
                    width: 48%;
                    margin-top: 3%;
                }
                @include breakpoint-down(small){
                    width: 46%;
                    margin-left:2%;
                    margin-right: 2%;
                    padding: 10px;
                    margin-top: 3%;
                }
                .logo{
                    width: 50%;
                    margin-left: 3%;
                    button{
                        border: none;
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                        box-shadow: $shadow_1;
                        @include breakpoint-down(small){
                            width: 50px;
                            height: 50px;
                        }
                    .money{
                        background-color: rgb(157, 218, 247);
                    }
                    &.user{
                        background-color: #e3eefe ;
                        em{
                            color: $blue_color  ;
                        }
                    }
                    &.chart{
                        background-color: rgba(75, 192, 192, 0.2);
                        em{
                            color: rgb(92, 209, 170);
                        }
                    }
                    &.money{
                        background-color:rgba(153, 102, 255, 0.2) ;
                        em{
                            color: rgba(156, 124, 219, 0.726) ;
                        }
                    }
                    &.wallet{
                        background-color: rgba(255, 207, 86, 0.349);
                        em{
                            color:  rgba(255, 206, 86, 1);
                        }
                    }
                }
                }
                .text{
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    .title{
                        font-size: 2rem;
                        font-weight: bold;
                    }
                    .content-text{
                        color: grey;
                    }
                    @include breakpoint-down(small){
                        .title{
                            font-size: 1.4rem;
                        }
                        .content-text{
                            font-size:0.6rem;
                        }
                    }
                }
            }
        }
        //end card
        .dashboard-graph{
            background-color: white;

            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 2% ;
            border-radius: 5px;
            // background-color: white;
            box-shadow: $shadow_1;
            .chart-container{
                width: 100%;
                
            }
            .dashboard-gmy{
                display: flex;
                justify-content: space-between;
                padding-right: 2%;
                padding-left: 2%;
                .earning{
                    color: grey;
                    font-size: 1.4rem;
                    font-weight: bold;
                    @include breakpoint-down(small){
                        font-size: 1.1rem;
                    }
                }
                .month-year{
                    width: 16%;

                    @include breakpoint-up(xlarge){
                        width: 16.5%;
                    }
                    @include breakpoint-up(large){
                        width: 20.5%;
                    }
                    @include breakpoint-down(medium){
                        width: 28%;
                    }
                    @include breakpoint-down(small){
                        width: 50%;
                    }
                    .active{
                        background-color:#F5F5F5;
                        
                        margin-left: 3%;
                        border-radius: 5px;
                        box-shadow: $shadow_1;
                        border:none;
                        font-weight: bold;
                        color: grey;
                        box-shadow: $shadow_2;
                        &:focus{
                            background-color: $blue_color;
                            
                            color: white;
                        }
                        @include breakpoint-down(small){
                            font-size: 12px;
                            // padding: 0;
                        }
                    }
                }
            }
        }

    }

</style>