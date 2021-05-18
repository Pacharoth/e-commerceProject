<template>
        <div class="container">
      <div class=" row title">Seller Profile</div>
      <div class="row">
        <div class="col-md-8 left data">
          <div class="row">
            <div class="col-md-3">Company</div>
            <div class="col-md-8"><span class="colon">:</span>myCompanyname</div>
          </div>
          <div class="row">
            <div class="col-md-3">Email</div>
            <div class="col-md-8"><span class="colon">:</span>myCompany@gmail.com</div>
          </div>
          <div class="row">
            <div class="col-md-3">Contact</div>
            <div class="col-md-8"><span class="colon">:</span>+855 112233</div>
          </div>
          <div class="row">
            <div class="col-md-3">Address</div>
            <div class="col-md-8"><span class="colon">:</span>st. 01, No 02, Meanchey, Phnom Penh</div>
          </div>
          <div class="row"><div class="col"><button class="btn" type="button">Change Password</button></div></div>
        </div>
       
        <div class="col-md-4 data">
          <center>
            <div>Profile Image</div>
            <img class="rounded mx-auto d-block" src="../../assets/img/profileSeller.jpg" alt="">
            <div><button type="button" class="btn">Upload New</button></div>
            
          </center>
          
        </div>
      </div>
    </div>
</template>
<script>
export default {
    title:'Seller Profile',
    name:'SellerProfile',
    
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
.header {
  color: #d60265;
}
.nav-link:active {
  background-color: #f165a7;
}
.nav-link:focus {
  background-color: #f165a7;
}
.form-control {
  border: 1px solid #d60265;
}
.search {
  font-family: Arial, FontAwesome;
}
.search::placeholder {
  color: #d60265;
}
.dropdown-toggle::after {
  content: none;
}
.dropdown-header {
  color: #d60265;
  font-size: 20px;
  font-weight: 900;
}
.btn.opt {
  background-color: #d60265;
  color: white;
}
.customerOrder {
  left: auto;
  right: 0;
  width: 650px;
}
.productOrdered {
  color: black;
}
.container{
    color: #d60265;
    font-size: 28px;
}
.title{
    font-weight: 600;
    font-size: 45px;
    border-bottom:0.5px solid black;
}
.left{
    border-right: 0.5px solid black;
}
.colon{
    padding-right: 2em;

    
}
.data{
    color: black;
}
.btn{
    background-color: #d60265;
    color: white;
}

</style>