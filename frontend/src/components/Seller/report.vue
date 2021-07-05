<template>
    <form action="" class="containers" @click="generatePDF()">
        <div class="shadow" ref="forms">
            <div class="title-background">
                <center v-if='statistic.type == "d"'><h2 class="title">Daily Report</h2></center>
                <center v-if='statistic.type == "m"'><h2 class="title">Monthly Report</h2></center>
                <center v-if='statistic.type == "y"'><h2 class="title">Yearly Report</h2></center>
            </div>
            <div class="container-fluid">
              <p> <span>Seller: </span> 
              <span >{{statistic.seller}}</span>
            </p>
              <p><span>Date: </span> <span>{{new Date(statistic.reportDate).toLocaleDateString()}}</span></p>
              <hr class="p-0">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Total Sold Units</th>
                    <td>{{statistic.saleUnit}}</td>
                    <!-- <th scope="col"></th> -->
                  </tr>
                  <tr>
                      <th scope="col">Total Earn</th>
                      <td scope="col"> {{statistic.totalEarn}}</td>
                  </tr>
                  <tr>
                      <th>Total Profit</th>
                      <td>{{statistic.totalPro}}</td>
                  </tr>
                </thead>
              </table>
              <!-- <hr class="p-0"> -->
            </div>
        </div>
    </form>
</template>
<script>
import {jsPDF} from 'jspdf';
import { ref} from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
    props:['id'],
    name:"report",
    title:"Report",
    setup(){
        const store = useStore();
        const forms = ref(null);
        const statistic = computed(()=>store.getters['seller/getStatistic'])
        function generatePDF(){
           var pdf = new jsPDF('p','pt','A3');
           pdf.internal.pageSize.width=520;
            pdf.html(forms.value,{
                filename:"Report_"+statistic.value.type
            }).save()
        }
        return{
            generatePDF,
            forms,
            statistic,
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
        width: 40%;
        margin-top: 2%;
        background-color: white;
    }
    hr{
        color: #D60265;
      
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