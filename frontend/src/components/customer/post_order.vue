<template>
    <div class="container">
        <h4 class="header">Past Order</h4>
        <slot v-for="order in data" :key="order">
        <div class="line"></div>
        <div class="row1" v-for="products in order.product.length" :key="products">
            <div class="column1">
                <h5 class="title">{{order.product[products-1].sellers.company}}</h5>
                <p>{{new Date(order.orderDate).toLocaleDateString()}}</p>
                <span><p class="text">{{order.product[products-1].products.name}}  {{order.product[products-1].products.detail}}</p></span><span>x{{order.product[products-1].quantity}}</span>
            </div>

            <div class="column2">
                <h5>{{order.product[products-1].products.price}}$</h5>
                <!-- <button v-if="order.product.length-1==products-1" class="btn2 ">Reorder</button> -->
            </div>
        </div>
        <div class="line"></div>
        </slot>
        <button class="btn1">see more</button>
    </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import axios from 'axios'
import { localhost } from '../../utils/FormValidation'
export default {
    title:'Past Order',
    name: 'postOrder',
    setup() {
        const store = useStore(),
        data = ref([]),
        user = computed(()=>store.getters['auth/getSession'])
        onMounted(async()=>{
            console.log(user.value.userid)
            const response=await axios.get(localhost+'/pastorder/'+user.value.userid)
            data.value = response.data;
        })
        return{
            data,
        }
    }
}
</script>

<style scoped>
    .text{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    * {
        box-sizing: border-box;
    }
    .row1 {
        display: flex;
    }
    .column1 {
        flex: 70%;
        padding: 10px;
        margin-left: 10%;
    }
    .column2 {
        flex: 70%;
        padding: 10px;
        text-align: center;
    }
    .header{
        color: #D60265;
        margin-left: 10%;
        margin-bottom: 3%;
        margin-top: 3%;
    }
    .line{
        border: 1px solid #ddd;
        width: 80%;
        margin-left: 10%;
    }
    .btn2{
        background-color: white;
        color: #D60265;
        border: 2px solid #D60265;
        margin-top: 3%;
    }
    .btn1{
        border: none;
        background-color: white;
        color: #aaa;
        margin-left: 50%;
        font-size: 15px;
    }
</style>