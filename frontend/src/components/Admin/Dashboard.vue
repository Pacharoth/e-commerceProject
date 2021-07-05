<template>
    <div class="dashboard-container" >
        
        <div class="dashtitle-gen">
            <h4 v-if="title=='Admin'">Dashboard</h4>
            <h4 v-if="title=='Seller'">Seller</h4>
            <button class="btn btn-primary">Generate Report</button>
        </div>
            <card-dashboard :title="title"/>
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
// import linegraph from '../chart/chartline';
import CardDashboard from './CardDashboard';
import { ref, toRefs } from '@vue/reactivity';
import {  computed, onMounted, watch} from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    name:"Dashboard",
    props:['title'],
    components:{
        CardDashboard,
    },
    setup(props) {
        const chart =ref(null)
        const chartdata=ref({});
        const {title} = toRefs(props);
        const store= useStore();
        var profit=[],payment=[],earning=[],label=[];
        var status = computed(()=>store.getters['admin/getStatus']);
        const realchart =ref(null);
        const admin= computed(()=>store.getters['admin/getData']);
        const title_dashboard = title.value;
        watch(admin,async()=>{
            // console.log(admin.value)
            await loadDataAdmin();
             chartdata.value =getGraph()
            realchart.value.data.labels=label;
            realchart.value.data.datasets[0].data=profit.reverse()
            realchart.value.data.datasets[1].data=earning.reverse()
            realchart.value.data.datasets[2].data=payment.reverse();
            console.log(realchart.value.data)
        })
        function getGraph(){
            return {
            type: 'line',
            data: {
            labels:label,
            datasets: [{
                label: 'Profit',
                data:profit,
                backgroundColor: '#e3eefe',
                fill:true,
                borderColor: '#4691FF',
                borderWidth: 1,
                tension: 0.5
            },
            {
                label: 'Earning',
                data: earning,
                backgroundColor: '#e3eefe',
                fill:true,
                borderColor: '#4691FF',
                borderWidth: 1,
                tension: 0.5
            },
            {
                label: 'Payment',
                data: payment,
                backgroundColor: '#e3eefe',
                fill:true,
                borderColor: '#4691FF',
                borderWidth: 1,
                tension: 0.5
            },
            ]
        },
        canvas:{
            parentNode:{
                style:{
                    height:'40vh',
                    width:'80vh'
                }
            }
        },
        options: {
            layout:{Padding:0},
            // plugins: {
            //     legend: {
            //         position: 'top',
            //     },
                
            // },
            scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
            responsive:true,
            maintainAspectRatio: false,  
        },
    
    };
        }
        onMounted(async()=>{
            console.log(title.value)

            chartdata.value= getGraph();
            realchart.value=new Chart(chart.value,chartdata.value);
        })  
        async function loadDataAdmin(){
            if(admin.value.result){
                profit=[]
                payment=[]
                earning=[]
                label=[]
                for(var i in admin.value.result){
                profit.push(admin.value.result[i].totalProfile)
                payment.push(admin.value.result[i].totalPayment)
                earning.push(admin.value.result[i].totalEarning)
                if(status.value=="daily"){
                    let data = new Date()
                    data.setUTCHours(admin.value.result[i]._id.hour)
                    data.setUTCMinutes(admin.value.result[i]._id.minute);
                    console.log(data.toLocaleString())
                    label.push(`${data.getHours()}:${data.getMinutes()}`)
                }else if(status.value=="monthly"){
                    let data = new Date()
                    let result = admin.value.result[i]._id
                    data.setMonth(result.month-1);
                    data.setFullYear(result.year);
                    data.setDate(result.day)
                    label.push(data.toLocaleString());
                }else if(status.value=="yearly"){
                    let data = new Date()
                    let result = admin.value.result[i]._id
                    data.setMonth(result.month-1);
                    data.setFullYear(result.year);
                    label.push(`${data.getMonth()}/${data.getFullYear()}`);
                }
            }
            }
        }
        return{
            //data
            status,
            title_dashboard,
            chartdata,
            chart,
            admin,
            label,
            loadDataAdmin,
            realchart
        }
    },
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
                height: 60vh;
                @include breakpoint-down(medium){
                    height: 60vh;
                }
                @include breakpoint-down(small){
                    height: 50vh;
                }

                
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