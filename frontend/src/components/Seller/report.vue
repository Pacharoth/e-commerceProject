<template>
    <form action="" class="containers" @click="generatePDF()">
        <div class="shadow" ref="form">
            <div class="title-background">
                <center v-if='statistic.type == "d"'><h2 class="title">Daily Report</h2></center>
                <center v-if='statistic.type == "m"'><h2 class="title">Monthly Report</h2></center>
                <center v-if='statistic.type == "y"'><h2 class="title">Yearly Report</h2></center>
            </div>
            <div class="container-fluid">
              <p> <span>Seller: </span> 
              <span >{{statistic.seller}}</span>
             </p>
              <p><span>Date:</span> <span>{{new Date(statistic.reportDate).toLocaleDateString()}}</span></p>
              <hr class="p-0">
                <table class="table">
                <tbody>
                    <tr>
                    <th class="report-title" >Total Sold Units</th>
                    <th class="report-data">{{statistic.saleUnit}}</th>
                    </tr>
                    <tr>
                    <th class="report-title">Total Earn</th>
                    <td class="report-data">{{statistic.totalEarn}}</td>
                    </tr>
                    <tr>
                    <th class="report-title">Total Profit</th>
                    <td class="report-data">{{statistic.totalPro}}</td>
                    </tr>
                </tbody>
                </table>
              
              <!-- <hr class="p-0"> -->
            </div>
        </div>
    </form>
</template>
<script>
import {jsPDF} from 'jspdf';
import { ref} from '@vue/reactivity';
// import { computed } from '@vue/runtime-core';
// import { useStore } from 'vuex';
export default {
    props:['id'],
    name:"report",
    title:"Report",
    computed:{
        statistic(){
            return this.$store.getters['seller/getStatistic'];
        },
        seller(){
            return this.$store.getters['/seller/getSellers']
        }
    },
    // mounted(){
    //     console.log("sellers from store", this.seller)
    // },
    setup(){
        // const store = useStore();
        const form = ref(null);
        function generatePDF(){
           let pdf = new jsPDF('p','pt','A4');
           pdf.internal.pageSize.width=520;
            pdf.html(form.value,{
                filename:"report"
            }).save()
        }
        return{
            generatePDF,
            form,
        }
    },

}
</script>
<style scoped>
    .title{
        color: white;
        padding-top: 3%;
        padding-bottom: 3%;
    }
    
    .title-background{
        background-color: #D60265;
    }
    .containers{
        margin: auto;
        width: 35%;
        margin-top: 2%;
        background-color: white;
    }
    hr{
        color: #D60265;
    }
    .report-title{
        text-align: left;
        padding-left: 5%;
    }
    .report-data{
        text-align: left;
    }
    .container-fluid{
        font-weight: bold;
        color:black;
    }
 
    @media (max-width:862px){
        .containers{
            width: 70%;
        }
    }
    @media (max-width:500px) {
        .containers{
            width: 80%;
        }
    }
    @media (max-width:400px) {
        .containers{
            width: 90%;
        }
    }
</style>