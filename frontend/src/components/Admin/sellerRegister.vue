<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Seller Register</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <form action="">
      <div class="modal-body">
            <div class="form-group">
                <label for="Company">Company Name:</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group">
                <label for="Email">Email:</label>
                <input type="email" class="form-control">
            </div>
            <div class="form-group">
                <label for="Contact">Contact:</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group">
                <label for="Address">Address:</label>
                <input type="text" class="form-control">
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </form>
    </div>
  </div>
</div>
</template>
<script>

export default {
    props:['show'],
    name:"SellerRegister", 
       
}
</script>
<style lang="scss">

</style>
