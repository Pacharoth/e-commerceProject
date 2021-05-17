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
            <div class="row mt-3 mb-3">
            <a href="http://localhost:8080/productdetail" class="col-sm-6 col-md-4 col-lg-3 mt-3 mb-3 cart">
                <div class="card" style="width: 18rem; position: relative;">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </a>
            <!-- <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mb-3">
                <div class="card" style="width: 18rem; position: relative;">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mb-3">
                <div class="card" style="width: 18rem; position: relative;">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mb-3">
                <div class="card" style="width: 18rem; position: relative;">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mb-3">
                <div class="card" style="width: 18rem; position: relative;">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-3 mt-3 mb-3 ">
                <div class="card" style="width: 18rem; position: relative;">
                <img src="../../assets/img/sneaker.jpg" class="card-img-top" alt="...">
                <div class="discount">20% DISCOUNT</div>
                <div class="card-body">
                    <h6>Sneaker Shop</h6>
                    <p class="card-text">White Sneaker from USA</p>
                    <span class="dis_price">$16</span> <span class="price">$20</span>
                </div>
                </div>
            </div> -->
            
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
import {Modal,Carousel} from 'bootstrap';
import Categorydropdown from './Categorydropdown'
export default {
    title:'Homepage ',
    name:"Customer",
    data(){
        return{
            modal:null,
            carousel:null
        }
    },
    components:{
        Categorydropdown
    },
    mounted(){
        this.modal=new Modal(this.$refs.modal)
        this.carousel = new Carousel(this.$refs.carousel)
    }
}
</script>
<style scoped>
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
  }

</style>