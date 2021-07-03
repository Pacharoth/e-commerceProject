<template>
    <form action="" class="containers" @click="generatePDF">
        <div class="shadow" ref="form">
            <div class="title-background">
                <center v-if='statistic.type == "d"'><h2 class="title">Daily Report</h2></center>
                <center v-if='statistic.type == "m"'><h2 class="title">Monthly Report</h2></center>
                <center v-if='statistic.type == "y"'><h2 class="title">Yearly Report</h2></center>
            </div>
            <div class="container-fluid">
              <p> <span>Seller:</span> 
              <span >{{statistic.seller}}</span>
            </p>
              <p><span>Date:</span> <span>{{new Date(statistic.reportDate).toLocaleDateString()}}</span></p>
              <hr class="p-0">
              <table class="table">
                <thead>
                  <tr>
                    <th>Total Sold Units</th>
                    <td>{{statistic.saleUnit}}</td>
                    <!-- <th scope="col"></th> -->
                  </tr>
                  <tr>
                      <th>Total Earn</th>
                      <td>{{statistic.totalEarn}}</td>
                  </tr>
                  <tr>
                      <th>Total Profit</th>
                      <td>{{statistic.totalPro}}</td>
                  </tr>
                </thead>
              </table>
              <hr class="p-0">
            </div>
        </div>
    </form>
</template>
<script>
import {jsPDF} from 'jspdf';
import { ref} from '@vue/reactivity';
export default {
    props:['id'],
    name:"report",
    title:"Report",
    computed:{
        statistic(){
            return this.$store.getters['seller/getStatistic'];
        }
    },
    setup(){
        const form = ref(null);
        function generatePDF(){
           let pdf = new jsPDF('p','pt','A3');
           pdf.internal.pageSize.width=640;
            pdf.html(form.value,{
                filename:this.statistic.type+"report"
            }).save()
        }
        return{
            generatePDF
        }
    }


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
        width: 50%;
        margin-top: 2%;
    }
    hr{
        color: #D60265;
      
    }
    .description{
        color: #D60265;
    }
    .detail{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100px;
    }
    .total{
        align-items: center;
        padding-bottom: 5%;
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