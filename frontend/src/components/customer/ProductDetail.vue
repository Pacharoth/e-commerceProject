<template>
<div class=" all-container">
        <div class="row mt-2">
            <div class="col-md-6">
                <div class="row">
                    <img class="img" :src="'http://localhost:3000/'+product.img" alt="">
                </div>
                <div class="flex mt-3 mb-3">
                    <div><img class="small-product" :src="'http://localhost:3000/'+product.img" alt=""></div>
                    <div><img class="small-product" :src="'http://localhost:3000/'+product.img" alt=""></div>
                    <div><img class="small-product" :src="'http://localhost:3000/'+product.img" alt=""></div>
                    <div><img class="small-product" :src="'http://localhost:3000/'+product.img" alt=""></div>
                </div>

            </div>
            <div class="col-md-6 ">
                <h3>{{product.name}}</h3>
                <p class="decription">{{product.detail}}</p>
                <p class="price">{{product.price-(product.price*product.discount/100)}}$</p>
                <p>Size:</p>
                <div class="size mb-3" ref="color">
                    <button class="border shadow " @click="changeColor(0)">M</button>
                    <button class="border shadow " @click="changeColor(1)">L</button>
                    <button class="border shadow" @click="changeColor(2)">XL</button>
                    <button class="border shadow" @click="changeColor(3)">XXL</button>
                </div>
                <p>Color:</p>
                <div class="color mb-3"> 
                    <img class="color-img" :src="'http://localhost:3000/'+product.img" alt="">
                    <img class="color-img" :src="'http://localhost:3000/'+product.img" alt="">
                </div>
                <p>Quantity:</p>
                
                <button class="btn qty shadow " @click="decre()"><i class="fas fa-minus"></i></button>
                <span> {{qty}} </span>
                <button class="btn qty shadow " @click="incr(product.qty)"><i class="fas fa-plus"></i></button>
                <span> {{product.qty - qty}} pieces available</span>
                <div>
                    <!-- <router-link to="/receipt" class="buynow mt-3 ">Buy Now</router-link> -->
                    <button @click="postShoppingCart({
                       qty:qty,
                       product,

                    })" class=" addtocart mt-3 ">Add to Cart</button>
                </div>
                <h5 class="mt-3"><router-link to="/feedback" style="text-decoration: none; color: black;">View Feedback</router-link></h5>
                <div class=" comment mt-4 d-flex align-items-center">
                    <span class="profile d-flex align-items-center justify-content-center">M</span>
                    <input class="cmt" name="" id="" placeholder="Add a public comment......." >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, toRefs } from '@vue/reactivity'
import { computed, onMounted, watchEffect } from '@vue/runtime-core';
import axios from 'axios';
import { localhost } from '../../utils/FormValidation';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    title:'Product Detail',
    name:'ProductDetail',
    props:["id"],
    data(){
        return{
            qty:1,
        }
    },
    setup(props) {
        const color = ref(null);
        const {id}= toRefs(props);
        const product = ref({});
        const error = ref("");
        const store = useStore();
        const router = useRouter()
        const user = computed(()=>store.getters['auth/getSession'])
        onMounted(()=>{
            console.log(color.value.children[0]);
        })
        //watch change  
        watchEffect(async()=>{
            const response =await axios.get("http://localhost:3000/productdetail/"+id.value);
            console.log(response.data);
            product.value=response.data;
        })
        //method
        function changeColor(number){
            let colors = color.value.children[number].classList;
            colors.contains('active')?colors.remove('active'):colors.add('active');
        }
        async function postShoppingCart(data){
            const response = await axios.post(localhost+"/shoppingcart",{data,customers:user.value.userid});
            if(response.data.save){
                router.push({name:"shoppingcart"});
            }else{
                error.value ="Can not be purchased";
            }
        }
        return{
            color,
            changeColor,
            product,
            postShoppingCart,
        }
    },
    async mounted(){

    },
    methods:{
        incr(product){
            if(this.qty<product)this.qty++;
        },
        decre(){
            if(this.qty>1){
                this.qty--;
            }
        }
    }

}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .all-container{
        @extend .container-fluid;
        padding: 2%;
        margin-top: 2%;
        background-color: white;
        border-radius: 5px;
        box-shadow: $shadow_1;
        width: 90%; 
    }
     .img{
        width: 80%;
        margin: auto;
        height: 500px;
        object-fit: cover;
    }
    .small-product{
        width: 60%;
        margin-left: 20%;
        height: 100px;
        object-fit: cover;
    }
    .flex{
        display: flex;
        /* flex-wrap: nowrap; */
        /* justify-content: center; */
    }
    .decription{
        font-size: large;
        margin-right: 10%;
    }
    .price{
        font-size: large;
        font-weight: bold;
    }
    .border{
        border: 1px solid gray;
        border-radius: 5px;
        padding-left: 5px;
        padding-right: 5px;
        margin-right: 1%;
        background-color: white;
    }
    .qty{
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 50%;
        font-size: 10px;
        background-color: white;
    }
    .buynow{
        @extend .btn;
        color: white;
        font-weight: bold;
        background-color: #D60265;
        box-shadow: $shadow_1;
        border-radius: 5px;
        &:focus,&:hover{
            color:white;
            background-color: #e2257d;
            box-shadow: $shadow_2;
        }
        
    }
    .addtocart{
        @extend .btn;
        color: white;
        font-weight: bold;
        background-color: #4691FF;
        box-shadow: $shadow_1;
        border-radius: 5px;
        &:focus,&:hover{
            background-color: #3183ff;
            color: white;
            box-shadow: $shadow_2;
        }
    }
    .profile{
        color: white;
        width: 30px;
        height: 30px;
        background-color: #D60265;
        font-weight: bold;
        border-radius: 50%;
    }
    .cmt{
        @extend .form-control;
        border: none;
        margin-left: 5%;
        width: 80%;
        color: rgb(58, 57, 57);
        background-color: #eee;
        border-radius: 5px;
        &:focus{
            color: rgb(59, 58, 58);
            background-color: rgb(223, 223, 223);
            box-shadow: $shadow_2;
        }
    }

    .color{
        display: flex;

    }
    .color-img{
        width: 10%;
        margin-right: 5%;
    }
    .active{
        background-color:#D60265;
        color: white;
    }
</style>