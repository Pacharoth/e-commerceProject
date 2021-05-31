<template>
        <div class="container">
      <div class=" row title">Seller Profile</div>
      <div class="row">
        <div class="col-md-8 left data">
          <div class="row">
            <div class="col-md-3">Company</div>
            <div class="col-md-8"><span class="colon">:</span>{{seller.company}}</div>
          </div>
          <div class="row">
            <div class="col-md-3">Email</div>
            <div class="col-md-8"><span class="colon">:</span>{{user.email}}</div>
          </div>
          <div class="row">
            <div class="col-md-3">Contact</div>
            <div class="col-md-8"><span class="colon">:</span>{{seller.contact}}</div>
          </div>
          <div class="row">
            <div class="col-md-3">Address</div>
            <div class="col-md-8"><span class="colon">:</span>{{seller.address}}</div>
          </div>
          <div class="row">
            <div class="col">
              <button @click="modal.show()" class="btn pink" type="button">
                Change Password
              </button>
            </div>
          </div>
        </div>
       
        <div class="col-md-4 data">
          <center>
            <div>Profile Image</div>
            <img class="rounded mx-auto d-block" src="../../assets/img/profileSeller.jpg" alt="">
            <div>
              <button type="button" class="btn pink" @click="modal.show()" data-toggle="modal">Upload New</button>
            </div>
            <!-- add img model -->
            <div class="modal fade" id="example" tabindex="-1" ref="modal" role="dialog" aria-labelledby="exampleLabel" aria-hidden="false">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title header" id="exampleModalLabel">Add Profile Image</h5>
                    <button type="button" class="close" @click="modal.hide()" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form ref="form" enctype="multipart/form-data">
                    <div class="modal-body">
                      <input ref="img" class="form-control" type="file" id="profilepic" name="profiepic" />
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" @click="modal.hide()" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn opt">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
          </center>
          
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import {Modal} from 'bootstrap';
export default {
    title:'Seller Profile',
    name:'SellerProfile',
    data(){
      return{
        modal:null,
        seller:{},
        user:{},
      }
    },
    async mounted(){
     this.modal=new Modal(this.$refs.modal);
     const seller = await axios.get("http://localhost:3000/getSeller/"+localStorage.getItem('userid')) 
     this.seller = seller.data
     this.user = seller.data.users
     console.log("seller profile",this.user)
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    // @import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css";

#profilepic{
  background-color: #d60265;
  color: #d60265;
}
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
.pink{
    background-color: #d60265;
    color: white;
}

</style>