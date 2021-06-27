<template>
    <div>
        <div class="container">
        <h3 class="header">Shopping Card</h3>

            <!--first part-->
            <div class="row1-one" v-for="products in product" :key="products">
                <p style="color: #D60265;">
                    <span class="round">
                        <!-- <input v-if="" class="checkBox" type="checkbox" id="checkbox" /> -->
                    </span>    
                    {{products.sellers.company}}
                    <button class="btn" style="color: red; float: right;"><i class="fas fa-times"></i></button>
                </p>
                <div class="row1">
                    <!--left part-->
                    <div class="column1">
                        <span>
                            <span class="round">
                                <input v-if="products.status=='checked'" class="checkBox" type="checkbox" checked id="checkbox" />
                                <input v-else class="checkBox" type="checkbox" checked id="checkbox" />
                                <!-- <label for="checkbox"></label> -->
                            </span>                               
                             <img class="smallImg" :src="'http://localhost:3000'+products.products.img" alt="">
                        </span>
                    </div>

                    <!--right part-->
                    <div class="column2">
                        <!-- Blending uptown chic with downtown cool, the Slater sling pack combines our signature logo print with contrasting leather trim. A removable braided chain strap lends an edgy effect, while a front zip pocket  -->
                        {{products.products.detail}}
                        <p>Size: L <span>Color: Gray</span></p>
                        <p style="font-weight: bold;">${{products.products.price-(products.products.discount*products.products.price/100)}}</p>
                        <!--quantity part-->
                        <div class="flex-container">
                            <button class="btn btn-outline-secondary mr-2" ><i class="fas fa-minus"></i></button>
                            <div class="btn btn-outline-secondary ">x{{products.quantity}}</div>
                            <button class="btn btn-outline-secondary ml-2" ><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!--last part-->
            <div class="last" v-if="total!==0">
                <span class="">Total: ${{total}}</span> 
                <!-- <span><button type="submit" class="btn btn1">Check Out</button></span> -->
                <span ref="paypal" class="paypal"></span>
            </div>

        </div>
        
    </div>

</template>

<script>
import { ref } from '@vue/reactivity'
import { computed,  onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useStore } from 'vuex';
import { localhost } from '../../utils/FormValidation';
import {insertPayPalCustomer} from '../../utils/paypal'
import {  useRouter } from 'vue-router';
export default {
    name: 'shopping_cart',
    title:'Shopping Cart',
    
    setup(){
        const paypal = ref(null),
        store = useStore(),
        product = ref([]),
        router  = useRouter(),
        user =computed(()=>store.getters['auth/getSession']),
        total = ref(0),
        quantity=ref(0);
    
        onMounted(async()=>{
            await  loadData();
            await insertPayPalCustomer({
                total:total,
                product:product,
                paypal:paypal,
                router:router,
            });
            
        })
        async function increase(){
            
        }
        async function loadData(){
            total.value=0;
            const response =await axios.get(localhost+"/shoppingcart/"+user.value.userid);
            console.log(response.data);
            product.value=response.data;
            for(var aproduct in product.value){
                var aProduct=product.value[aproduct].products
                var quantity = product.value[aproduct].quantity
                var discount =aProduct.discount*aProduct.price/100
                console.log("discount",discount,"quantity",quantity,"price",aProduct.price)
                total.value = total.value+(quantity*(aProduct.price-discount))
            }
        }
        return{
            product,
            user,
            total,
            paypal,
            quantity,
            increase,
        }
    },
    // data(){
    //     return{
    //         qty: products.quantity,
    //     }
    // },
    // methods:{
    //     incr(){
    //         this.qty++;
    //     },
    //     decre(){
    //         if(this.qty>1){
    //             this.qty--;
    //         }
    //     }
    // }
}
</script>

<style scoped>

    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'; 
    *{
        box-sizing: border-box;
    }
    .row1{
        display: flex;
    }
    .column1{
        flex: 30%;
        padding: 10px;
    }
    .column2{
        flex: 70%;
        padding: 10px;
        margin: 0;
    }
    .header{
        color: #D60265;
        margin-left: 15%;
        margin-bottom: 3%;
    }
    .row1-one{
        background-color: white;
        margin-bottom:2% ;
        width: 80%;
        margin-left: 15%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1),0 8px 16px rgba(0,0,0,0.1);
        padding: 15px;
    }
    .row1-two{
        margin-top: 5%;
        width: 80%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        padding: 15px;
        margin-left: 15%;
    }
    .row1-third{
        margin-top: 5%;
        width: 80%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        padding: 15px;
        margin-left: 15%;
    }
    .last{
        display: flex;
        align-items: center;    
        width: 100%;
        justify-content: flex-end;
        padding-right:5% ;
        margin-bottom: 2%;
    }
    .paypal{
        margin-left: 2%;
    }
    .btn1,.btn1:hover{
        border: none;
        background-color: #D60265;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1);
    }
   
    .flex-container {
        display: flex;
        float: right;
    }

    .flex-container > div {
        background-color: white;
        color: black;
        width: 40px;
        padding: 5px;
        text-align: center;
        border: 1px solid black;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .smallImg{
        height: 120px ;
        object-fit: cover;
        margin-left:7% ;
    }

</style>