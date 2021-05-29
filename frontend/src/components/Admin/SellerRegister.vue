<template>
<div class="modal fade" id="exampleModal" ref="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog background">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class=" modal-title text-centered text-primary" id="exampleModalLabel">Seller Register</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <form action="" @submit.prevent="registerUser">
      <div class="modal-body">
        <div class="alert alert-warning" role="alert" v-if="err">
          {{err}}
        </div>
            <div class="form-group">
                <label for="Company " class="text-secondary">Company Name:</label>
                <input type="text" v-model="company" class="input" placeholder="Pizza">
            </div>
            <div class="form-group">
                <label for="Email" class="text-secondary">Email:</label>
                <input type="email" v-model="email" class="input" placeholder="youremail@website.com">
            </div>
            <div class="form-group">
                <label for="Contact" class="text-secondary">Contact:</label>
                <input type="text" v-model="contact" class="input" placeholder="09352323432">
            </div>
            <div class="form-group">
                <label for="Address" class="text-secondary">Address:</label>
                <input type="text" v-model="address" class=" input" >
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn color-red" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn color-blue">Save changes</button>
      </div>
      
    </form>
    </div>
  </div>
</div>
</template>
<script>
import { ref } from '@vue/reactivity'
import axios from 'axios';
import { localhost, validatePhoneNumber } from '../../utils/FormValidation';
import { onMounted } from '@vue/runtime-core';
import {Modal} from 'bootstrap';
export default {
   title:'Admin Seller',
    props:['show'],
    name:"SellerRegister", 
    setup() {
      const email =ref("");
      const company=ref("");
      const address = ref("");
      const contact=ref("");
      const err = ref("");
      const modal = ref(null);
      const newModal=ref(null);
      onMounted(()=>{
        newModal.value=new Modal(modal.value);
      })
      const registerUser =async()=>{
        const emails = await axios.post(localhost+'/email',{email:email.value});
        console.log(emails.data.length);
        if(emails.data.length>0){
          if(validatePhoneNumber.test(contact.value)){
            const response = await axios.post(localhost+'/admin/seller',{
              company:company.value,
              contact:contact.value,
              address:address.value,
              email:email.value,
              _id:emails.data[0]._id
            }
            );
            if(response.data.result){
              err.value=response.data.result;
              setTimeout(()=>err.value="",3000)
            }else{
              newModal.value.hide()
              alert(company.value+" Has been registered");
              company.value="";
              email.value="";
              address.value="";
              contact.value="";
            }
          }else{
            err.value="PhoneNumber Invalid! +,0 and the rest is number range 15 digit";
            setTimeout(()=>err.value="",3000);
          }

        }else{
          err.value = "email not exists try again";
          setTimeout(()=>err.value="",3000)
        }
      }
      return{
        email,
        company,
        address,
        contact,
        registerUser,
        modal,
        err,
      }
    }
}
</script>
<style lang="scss" scope>
  @import '../../assets/sass/colorpage';
  @import '../../assets/sass/maxin';
  @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
  .modal-footer{
    button{
      border: none;
      box-shadow: $shadow_1;
      border-radius: 5px;
      &:hover{
        color: white;
        border-radius: 5px;
        box-shadow: $shadow_2;
      }
      &:focus{
        color: white;
        border-radius: 5px;
        box-shadow: $shadow_2;
      }
    }
    .color-blue{
      background-color:$blue_color;
      color: white; 
      &:hover{
        background-color: rgb(82, 112, 247)
      }
      &:focus{
        background-color: rgb(94, 123, 250)

      }
    }
    .color-red{
      background-color: rgb(245, 50, 50);
      color: white;
      &:hover{
        background-color: rgb(253, 71, 71);
      }
      &:focus{
        background-color: rgb(253, 71, 71);
      }

    }
  }
  .input{
    @extend .form-control;
    border: none;
    color: grey;
    margin-top: 2%;
    margin-bottom: 2%;
    border-radius: 10px;
    box-shadow: $shadow_1;
      &:focus{
        box-shadow: $shadow_2;   
      }
    
  }
  .background{
    @extend .modal-dialog;
    background-color: rgb(216, 214, 214);
    border-radius: 5px;
  }
</style>
