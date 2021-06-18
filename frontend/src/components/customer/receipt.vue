<template>
    <form action="" class="containers">
        <div class="shadow">
            <div class="title-background">
                <center><h2 class="title">Amazing Shop Receipt</h2></center>
            </div>
            <div class="container-fluid">
              <p> <span>Customer Name:</span> <span>Ang Mengchhuong</span></p>
              <p><span>Store:</span> <span>Clothy Store</span></p>
              <p><span>Date:</span> <span>12/5/2021</span></p>
              <hr class="p-0">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Unit Cost</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Men Pants</th>
                    <td>1</td>
                    <td>10%</td>
                    <td>10$</td>
                  </tr>
                  <tr>
                    <th scope="row">Bag</th>
                    <td>2</td>
                    <td>4$</td>
                    <td>8$</td>
                  </tr>
                </tbody>
              </table>
              <hr class="p-0">

              <div class="d-flex bd-highlight mb-3 total align-items-center">
                <div class="me-auto p-2 bd-highlight"></div>
                <div class="p-2 bd-highlight">Total</div>
                <div class="p-2 bd-highlight">18$</div>
              </div>
            </div>
        </div>
    </form>
</template>
<script>
import { ref, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { localhost } from '../../utils/FormValidation';
export default {
    props:['id'],
    title:"Receipt",
    setup(props) {
        const {id} = toRefs(props);
        const receipt = ref({});
        onMounted(async()=>{
            const response = await axios.get(localhost+"/receipt/"+id);
            receipt.value = response.data;
        })
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
    }
    hr{
        color: #D60265;
      
    }
    .description{
        color: #D60265;
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