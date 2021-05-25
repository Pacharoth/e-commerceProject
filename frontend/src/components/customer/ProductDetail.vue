<template>
<div class=" all-container">
        <div class="row mt-2">
            <div class="col-md-6">
                <div class="row">
                    <img class="img" src="../../assets/img/pants.jpg" alt="">
                </div>
                <div class="flex mt-3 mb-3">
                    <div><img class="small-product" src="../../assets/img/pants.jpg" alt=""></div>
                    <div><img class="small-product" src="../../assets/img/pants.jpg" alt=""></div>
                    <div><img class="small-product" src="../../assets/img/pants.jpg" alt=""></div>
                    <div><img class="small-product" src="../../assets/img/pants.jpg" alt=""></div>
                </div>

            </div>
            <div class="col-md-6 ">
                <p class="decription">HYBSKR Men's Casual Oversize Pants 2021
                    Fashion Harajuku Streetwear Trousers Male 
                    Solid Color Classic Ankle-length Pants</p>
                <p class="price">$10</p>
                <p>Size:</p>
                <div class="size mb-3" ref="color">
                    <button class="border shadow " @click="changeColor(0)">M</button>
                    <button class="border shadow " @click="changeColor(1)">L</button>
                    <button class="border shadow" @click="changeColor(2)">XL</button>
                    <button class="border shadow" @click="changeColor(3)">XXL</button>
                </div>
                <p>Color:</p>
                <div class="color mb-3"> 
                    <img class="color-img" src="../../assets/img/pants.jpg" alt="">
                    <img class="color-img" src="../../assets/img/pants.jpg" alt="">
                </div>
                <p>Quantity:</p>
                
                <button class="btn qty shadow "><i class="fas fa-minus"></i></button>
                <span> 1 </span>
                <button class="btn qty shadow "><i class="fas fa-plus"></i></button>
                <span> 6297 pieces available</span>
                <div>
                    <button href="" class="buynow mt-3 ">Buy Now</button>
                    <a href="http://localhost:8080/shoppingcart" class=" addtocart mt-3 ml-3">Add to Cart</a>
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
import { ref } from '@vue/reactivity'
import { onMounted, watchEffect } from '@vue/runtime-core';
export default {
    title:'Product Detail',
    name:'ProductDetail',
    setup() {
        const color = ref(null);
        onMounted(()=>{
            console.log(color.value.children[0]);
        })
        //watch change  
        watchEffect(()=>{
            console.log(color.value);
        })
        //method
        function changeColor(number){
            let colors = color.value.children[number].classList;
            colors.contains('active')?colors.remove('active'):colors.add('active');
        }
        return{
            color,
            changeColor
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
    }
    .small-product{
        width: 60%;
        margin-left: 20%;

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

        // padding-left: 3%;
        // padding-right: 3%;
        // padding-top: 2%;
        // padding-bottom: 2%;
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