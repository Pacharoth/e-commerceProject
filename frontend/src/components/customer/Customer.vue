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
            <slot v-if="productSearch.length<=0">
                <router-link :to="'/productdetail/'+pro._id" class=" cart" v-for="pro in product" :key="pro">
                    <div class="card" style="">
                    <img :src="'http://localhost:3000/'+pro.img[0]" class="card-img-top imgcard" alt="...">
                    <div class="discount" >{{pro.discount}}% DISCOUNT</div>
                    <div class="card-body">
                        <h6>{{pro.name}}</h6>
                        <p class="card-text detail">{{pro.detail}}</p>
                        <span class="dis_price">{{pro.price}}$</span> <span class="price"></span>
                    </div>
                    </div>
                </router-link>
            </slot>
            <slot v-else>
                <router-link :to="'/productdetail/'+pro._id" class=" cart" v-for="pro in productSearch" :key="pro">
                    <div class="card" style="">
                    <img :src="'http://localhost:3000/'+pro.img[0]" class="card-img-top imgcard" alt="...">
                    <div class="discount" >{{pro.discount}}% DISCOUNT</div>
                    <div class="card-body">
                        <h6>{{pro.name}}</h6>
                        <p class="card-text detail">{{pro.detail}}</p>
                        <span class="dis_price">{{pro.price}}$</span> <span class="price"></span>
                    </div>
                    </div>
                </router-link>
            </slot>
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
import { localhost } from '../../utils/FormValidation'
export default {
    title:'Homepage ',
    name:"Customer",
    data(){
        return{
            modal:null,
            carousel:null,
            // product:[]
        }
    },
    components:{
        Categorydropdown
    },
    async mounted(){
        const response = await axios.get("http://localhost:3000/listProduct");
        console.log(response.data);
        this.$store.dispatch("customer/loadProduct",response.data);
        var query = this.$route.query.q
        if(query){
            var responseSearch =await axios.get(localhost+"/search/product?q="+query);
            this.$store.dispatch('customer/searchProduct',responseSearch.data);
        }
    },
    computed:{  
        product(){
            return this.$store.getters['customer/getAllProducts'];
        },
        productSearch(){
            return this.$store.getters['customer/getProductSearch'];
        }
    },
    methods:{
  
    },
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
  .imgcard{
      height: 300px;
      object-fit: cover;
  }
  .cart{
      text-decoration: none;
      color: black;
      margin:1%;
      width: 23%;
  }
  .detail{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
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