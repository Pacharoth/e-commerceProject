<template>
    <div>
        <categorydropdown/>
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../assets/img/Image.png" class="d-block w-100 h-50" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../assets/img/2.png" class="d-block w-100 h-50" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../assets/img/hey.png" class="d-block w-100 h-50" alt="...">
            </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="container-fluid">
            <div class="product-listing">
            <router-link to="/productdetail" class=" cart">
                <div class="card" style="">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </router-link>
            <router-link to="/productdetail" class=" cart">
                <div class="card" style="">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </router-link>
                        <router-link to="/productdetail" class=" cart">
                <div class="card" style="">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </router-link>
            <router-link to="/productdetail" class=" cart">
                <div class="card" style="">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </router-link>
            <router-link to="/productdetail" class=" cart">
                <div class="card" style="">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </router-link>
            
            
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
            <div class="col-md-7 about-shop">
                <h5 class="">About Shop <hr style="margin: 0;"></h5>
                <p>Welcome to Amazing Shop which contain many categories such as electronic devices, clothes, cosmetic products. Our products are the best quality and suitable price</p>
                <h5 class="">Address<hr style="margin: 0;"></h5>
                <p>Our address is at the Capital City of Cambodia, which call Phnom Penh</p>
                <p>#03, St 02, Khan Dangkao, Sangkat Dangkao, Phnom Penh</p>
            </div>
            <div class="col-md-5 contact-us">
                <h5 class="">Contact Us <hr style="margin: 0;"></h5>
                <ul>Tel: +855 96 422 422</ul>
                <ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+855 12 775 445</ul>
                <ul>Email: amazingshop@gmail.com</ul>
                
            </div>
            </div>
        </div>

    </div>
    
</template>
<script>
// import {Modal} from 'bootstrap';
import Categorydropdown from './Categorydropdown'
import axios from 'axios'
export default {
    title:'Homepage ',
    name:"Customer",
    data(){
        return{
            modal:null,
            carousel:null,
            product:[]
        }
    },
    components:{
        Categorydropdown
    },
    async mounted(){
        const result = await axios.get('http://localhost:3000/listproducts')
        this.product = result.data
        console.log(this.product)
    },
    methods:{
       listProduct(){
           const result = axios.get('http://localhost:3000/listproducts')
           this.product = result.data
           console.log(this.product)

       } 
    }
}
</script>
<style  scoped>
  .discount{
    position: absolute;
    top: 10px;
    left: 0px;
    color: white;
    background-color: #D60265;
    padding-left: 5%;
    padding-right: 5%;
  }
  .price{
    color:red;
    text-decoration: line-through;
  }
  .contact-us{
    color: #D60265;
  }
  .about-shop{
    color: #D60265;

  }
  .cart{
      text-decoration: none;
      color: black;
      margin:1%;
      width: 23%;
  }
  .cart:hover,.cart:focus{
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),0 8px 16px rgba(0, 0, 0, 0.1);
  }
.product-listing{
    margin-top: 1%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    
}
@media (max-width:820px) {
    .cart{
        width: 31%;
    }
}
@media (max-width:654px) {
    .product-listing{
        margin-left: 0%;
    }
    .cart{
        width:48%;
    }
}
@media (max-width:400px) {
    .product-listing{
        justify-content: center;
    }
    .cart{
        width:100%;
    }
}
</style>