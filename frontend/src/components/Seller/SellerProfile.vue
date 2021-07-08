<template>
    <div class="container shadow p-3 mb-5 bg-body rounded p-5">
      <div class=" row title">Seller Profile</div>
      <div class="row content">
        <div class="col-md-8 left">
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
            <div class="col-md-3 address">Address</div>
            <div class="col-md-8"><span class="colon">:</span>{{seller.address}}</div>
          </div>
          <div class="row">
            <div class="col">
              <button @click="modalProfile.show()" class="btn pink" type="button">
                Change Password
              </button>
              <div class="modal fade" id="example" tabindex="-1" ref="modalProfile" role="dialog" aria-labelledby="exampleLabel" aria-hidden="false">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title header" id="exampleModalLabel">Change Password</h5>
                    <button type="button" class="close" @click="modalProfile.hide()" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form @submit.prevent="validate()" ref="form" enctype="multipart/form-data">
                    <div class="modal-body">
                      <div v-if="log != ''" class="alert alert-success" role="alert">
                        {{log}}
                      </div>
                      <div class="form-group">
                        <div v-if="notMatch.current != '' " class="notMatch">{{notMatch.current}}</div>
                        <label for="currentPwd">Current Password</label>
                        <input v-model="pwd.current" type="password" class="form-control" id="currentPwd" placeholder="Current Password" name="CurrentPwd">
                      </div>
                    <div class="form-group">
                      <label for="newPwd">New Password</label>
                      <input v-model="pwd.nw" type="password" class="form-control" id="newPwd" placeholder="New Password" name="newPwd">
                    </div>
                    <div class="form-group">
                      <div v-if="notMatch.nw!=''" class="notMatch">{{notMatch.nw}}</div>
                      <label for="confirm">Cofirm Password</label>
                      <input v-model="pwd.confirm" type="password" class="form-control" id="confirm" placeholder="Confirm Password" name="confirm">
                    </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" @click="modalProfile.hide()" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn opt">Change</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
       
        <div class="col-md-4 data picture-data">
          
            <div class="text-center w-100">Profile Image</div>
            <img class="rounded mx-auto d-block profile-img" v-if="user.img" :src="'http://localhost:3000'+user.img" alt="">
            <img class="rounded mx-auto d-block profile-img" v-else src="../../assets/logo.png" alt="">
            <div class="w-100 text-center">
              <button type="button" class="btn pink" @click="modal.show()" data-toggle="modal">Upload New</button>
            </div>
            <!-- add img model -->
            <div class="modal fade" id="example" tabindex="-1" ref="modal" role="dialog" aria-labelledby="exampleLabel" aria-hidden="false">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title header" id="exampleModalLabel">Update Profile Image</h5>
                    <button type="button" class="close" @click="modal.hide()" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form ref="form" @submit.prevent="addImg()" enctype="multipart/form-data">
                    <div class="modal-body">
                      <input class="form-control" type="file" id="proImg" name="proImg" accept="image/*"/>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" @click="modal.hide()" data-dismiss="modal">Cancel</button>
                      <button type="submit" class="btn opt" >Update</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
         
        </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import {Modal} from 'bootstrap';
// import bcrypt from 'bcrypt';
export default {
    title:'Seller Profile',
    name:'SellerProfile',
    data(){
      return{
        modal:null,
        modalProfile:null,
        seller:{},
        user:{},
        pwd:{},
        notMatch:{},
        log:'',
        proImg:'',
      }
    },
    async mounted(){
      this.modal=new Modal(this.$refs.modal);
      this.modalProfile=new Modal(this.$refs.modalProfile);
      const seller = await axios.get("http://localhost:3000/getSeller/"+localStorage.getItem('userid')) 
      this.seller = seller.data[0]
      this.user = seller.data[0].users
      console.log(this.seller)
      console.log(this.user)
    //  console.log("seller profile",this.user)
    //  console.log('pwd',this.pwd)

    },
    methods:{

      async addImg(){
         const img = new FormData(this.$refs.form)
         console.log("ref img form: ",img)
         console.log("img profile", img.get("proImg"))
         const res = await axios.put('http://localhost:3000/addProImg/'+localStorage.getItem('userid'),img)
         this.user.img=res.data.img
         localStorage.setItem("img",res.data.img);
         this.$store.dispatch("auth/updateImg",res.data.img)
         console.log("res img",res)
         this.modal.hide();
      },
      async validate(){
        if(this.pwd.nw != this.pwd.confirm){
          this.log=''
          this.notMatch.nw = 'Confirm password is not match !'
        }else{
          this.log=''
          const res = await axios.put('http://localhost:3000/changePwd/'+localStorage.getItem('userid'),this.pwd)
          console.log('change result',res.data)
          if(res.data.err == true){
            this.notMatch.current = "Password is incorrect"
          }else{
            this.notMatch.current = ''
            this.notMatch.nw =''
            this.log=res.data.message
            this.modal.hide();
          }
        }
      }
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
.picture-data{
  // display:block;
  // margin: auto;
  flex-wrap: wrap;
  justify-content: center;

}
.notMatch{
  color: red;
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
    // color: #d60265;
    font-size: 1.35rem;
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
.profile-img{
  height: 200px;
  object-fit: cover;
}
// .address{
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   max-width: 100%;
// }

</style>