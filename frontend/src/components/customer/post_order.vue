<template>
    <div class="container">
        <h4 class="header">Past Order</h4>
        <slot v-for="products in data.length" :key="products">
        <div class="line"></div>
        
        <div class="row1">
            <div class="column1">
                <h5 class="title">Clothy Store</h5>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h5>10$</h5>
                <button class="btn2">Reorder</button>
            </div>
        </div>
        </slot>
        <div class="line"></div>
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
    }
    .btn1{
        border: none;
        background-color: white;
        color: #aaa;
        margin-left: 50%;
        font-size: 15px;
    }
</style>