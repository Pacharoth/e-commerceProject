<template>
    <div class="dashboard-container" >
        
        <div class="dashtitle-gen">
            <h4 >Dashboard</h4>
            <button class="btn btn-primary">Generate Report</button>
        </div>
        <!-- card -->
        <div class="dashboard-card">
            <div class="card-one">
                <div class="logo">
                    <button class="user">
                    <em class="fas fa-user"></em>
                    </button>
                </div>
                <div class="text">
                    <span class="title">2830</span>
                    <span class="content-text">Total Register</span>
                </div>
            </div>
            <div class="card-one">
                <div class="logo">
                    <button class="chart">
                    <em class="fas fa-chart-bar icon"></em>
                    </button>
                </div>
                <div class="text">
                    <span class="title">2830</span>
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
                    <span class="title">2830</span>
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
                    <span class="title">2830</span>
                    <span class="content-text">This year profit</span>
                </div>
            </div>
            
        </div>
        <!-- endcard -->
        <div class="dashboard-graph">
            <div class="dashboard-gmy row">
                <span>Earning Statistics</span>
                <div class="month-year">
                    <button>Monthly</button>
                    <button>Weekly</button>
                </div>
            </div>
            <div class="chart-contain">
                <canvas ref="chart"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
import {Chart,LineController, LineElement, PointElement, LinearScale, Title, BarController, BarElement, CategoryScale} from 'chart.js'
export default {
    title:"Admin Dashboard",
    name:"Dashboard",
    // extends:Line,
    data(){
        return{
            chartdata:{
                type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
            },
        }
    },
    mounted() {
        Chart.register(LineController, LineElement, PointElement, LinearScale, Title,BarController,BarElement,CategoryScale);

        const chart= this.$refs.chart;
        console.log(chart)
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
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 2%;    
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
                    font-size: 1.5rem;
                }
            }
        }
        //card
        .dashboard-card{
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 2%;
            align-items: center;
            @include breakpoint-down(small){
                flex-direction: column;
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
                @include breakpoint-down(small){
                    width: 100%;
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
                }
            }
        }
        //end card

    }

</style>