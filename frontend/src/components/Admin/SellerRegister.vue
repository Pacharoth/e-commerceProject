<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog background">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class=" modal-title text-centered text-primary" id="exampleModalLabel">Seller Register</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <form action="">
      <div class="modal-body">
            <div class="form-group">
                <label for="Company " class="text-secondary">Company Name:</label>
                <input type="text" class="input">
            </div>
            <div class="form-group">
                <label for="Email" class="text-secondary">Email:</label>
                <input type="email" class="input">
            </div>
            <div class="form-group">
                <label for="Contact" class="text-secondary">Contact:</label>
                <input type="text" class="input">
            </div>
            <div class="form-group">
                <label for="Address" class="text-secondary">Address:</label>
                <input type="text" class=" input">
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn color-red" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn color-blue">Save changes</button>
      </div>
    </form>
    </div>
  </div>
</div>
</template>
<script>

export default {
   title:'Admin Seller',
    props:['show'],
    name:"SellerRegister", 
       
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
