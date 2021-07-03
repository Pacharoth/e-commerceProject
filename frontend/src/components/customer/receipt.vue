<template>
    <form action="" class="containers" @click="generatePDF">
        <div class="shadow" ref="form">
            <div class="title-background">
                <center><h2 class="title">Amazing Shop Receipt</h2></center>
            </div>
            <div class="container-fluid">
              <p> <span>Customer Name:</span> <span v-if="receipt.users">{{receipt.users.username}}</span></p>
              <p><span>Date:</span> <span v-if="receipt.orderDate">{{orderDate}}</span></p>
              <hr class="p-0">
              <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th scope="col">Description</th>
                    <th>Shop</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Unit Cost</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                <slot v-if="receipt.product">
                  <slot v-for="products in receipt.product.length" :key="products">
                  <tr>
                    <th>{{receipt.product[products-1].products.name}}</th>
                    <td class="detail">{{receipt.product[products-1].products.detail}}</td>
                    <td>{{receipt.product[products-1].sellers.company}}</td>
                    <td>{{receipt.product[products-1].quantity}}</td>
                    <td>${{(receipt.product[products-1].products.price)-(receipt.product[products-1].products.discount*receipt.product[products-1].products.price)}}</td>
                    <td>
                        ${{(receipt.product[products-1].quantity*receipt.product[products-1].products.price)-(receipt.product[products-1].products.discount*receipt.product[products-1].products.price)}}
                    </td>
                  </tr>
                  </slot>
                </slot>
                </tbody>
              </table>
              <hr class="p-0">

              <div class="d-flex bd-highlight mb-3 total align-items-center">
                <div class="me-auto p-2 bd-highlight"></div>
                <div class="p-2 bd-highlight">Total</div>
                <div class="p-2 bd-highlight">{{total}}$</div>
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
import {jsPDF} from 'jspdf';
export default {
    props:['id'],
    title:"Receipt",
    setup(props) {
        const form = ref(null),
        {id} = toRefs(props),
        receipt = ref({}),
        orderDate =ref(""),
        total = ref (0);
        onMounted(async()=>{
            const response = await axios.get(localhost+"/receipt/"+id.value);
            receipt.value = response.data;
            orderDate.value=new Date(receipt.value.orderDate).toLocaleDateString()
            for(const i in receipt.value.product){
                var data =receipt.value.product[i]
                total.value += (data.quantity*data.products.price)-(data.products.discount*data.products.price/100)
            }
        });
        function generatePDF(){
           var pdf = new jsPDF('p','pt','A3');
           pdf.internal.pageSize.width=640;
            pdf.html(form.value,{
                filename:"Receipt_"+orderDate.value
            }).save()
        }
        return{
            receipt,
            total,
            form,
            generatePDF,
            orderDate
        }
    }
}
</script>
<style scoped>
    .containers{
        background: white;
    }
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