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
                <div class="size mb-3">
                    <span class="border shadow">M</span>
                    <span class="border shadow">L</span>
                    <span class="border shadow">XL</span>
                    <span class="border shadow">XXL</span>
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
                    <button class="btn buynow mt-3 ">Buy Now</button>
                    <button class="btn addtocart mt-3 ml-3">Add to Cart</button>
                </div>
                <h5 class="mt-3"><a href="" style="text-decoration: none; color: black;">View Feedback</a></h5>
                <div class=" comment mt-4">
                    <span class="profile">M</span>
                    <input class="cmt" name="" id="" placeholder="Add a public comment......." >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    title:'Product Detail',
    name:'ProductDetail',
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .all-container{
        @extend .container-fluid;
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
        /* padding: 5%; */
        color: white;
        font-weight: bold;
        background-color: #D60265;
        
    }
    .addtocart{
        color: white;
        font-weight: bold;
        background-color: #4691FF;
    }
    .profile{
        border-radius: 50%;
        color: white;
        background-color: #D60265;
        font-weight: bold;
        padding-left: 3%;
        padding-right: 3%;
        padding-top: 2%;
        padding-bottom: 2%;
    }
    .cmt{
        border: none;
        margin-left: 5%;
        width: 80%;
    }

    .color{
        display: flex;

    }
    .color-img{
        width: 10%;
        margin-right: 5%;
    }
</style>