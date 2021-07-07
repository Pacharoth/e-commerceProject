<template>
    <dashboard title="Seller"/>
</template>
<script>
import { ref, toRefs } from '@vue/reactivity'
import Dashboard from './Dashboard'
import { computed, onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import axios from 'axios';
import { localhost } from '../../utils/FormValidation';
export default {
    title:'Seller Detail',
    name:'SellerDashboard',   
    props:['id'],
    components:{
        Dashboard,
    },
    setup(props) {
        const {id} = toRefs(props);
        const store = useStore()
        const status = computed(()=>store.getters['admin/getStatus']);
        var totalPro=ref(0),totalEarn=ref(0),yearPro=ref(0),saleUnit=ref(0); 
        watch(status,async()=>{
            await loadDataSeller();

        })  
        onMounted(async()=>{
            await loadDataSeller();
        })
        async function loadDataSeller(){
            var response;
            if(status.value=="yearly"){
                response = await axios.get(localhost+"/admin/seller/reportyear/"+id.value);
                console.log(response.data);
            }else if(status.value=="monthly"){
                response = await axios.get(localhost+"/admin/seller/reportmonth/"+id.value);
                console.log(response.data);
            }else if(status.value=="daily"){
                response= await axios.get(localhost+"/admin/seller/reportdaily/"+id.value);
            }
            store.dispatch("admin/setSeller",response.data);
            await loadToStore(response.data);
        }
        async function resetZero(){
            totalPro.value=0;
            totalEarn.value=0;
            saleUnit.value=0;
            yearPro.value=0
        }
        async function loadToStore(data){
            resetZero();
            for(var i in data){
                totalPro.value+=data[i].totalProfit;
                totalEarn.value+=data[i].totalEarning;
                saleUnit.value+=data[i].totalSaleUnit;
                yearPro.value+=data[i].totalPayment
            }
            store.dispatch("seller/loadStatistic",{
                totalPro:totalPro.value,
                totalEarn:totalEarn.value,
                saleUnit:saleUnit.value,
                yearPro:yearPro.value,
            })
        }
    }
}
</script>
