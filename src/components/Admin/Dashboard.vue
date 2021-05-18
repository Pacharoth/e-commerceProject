<template>
    <div class="dashboard-container" >
        
        <div class="dashtitle-gen">
            <h4 v-if="title=='Admin'">Dashboard</h4>
            <h4 v-if="title=='Seller'">Seller</h4>
            <button class="btn btn-primary">Generate Report</button>
        </div>
        <!-- card -->
            <card-dashboard :title="title"/>
        <!-- endcard -->
        <div class="dashboard-graph">
            <div class="dashboard-gmy">
                <span class="earning">Earning Statistics</span>
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
import CardDashboard from './CardDashboard';
export default {
    // title:'Dashboard',
    name:"Dashboard",
    props:['title'],
    components:{
        CardDashboard,
    },
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
    @import '../../assets/sass/carddasboard';
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