<template>
<div class="modal fade" id="customerModal" tabindex="-1" aria-labelledby="customerModalLabel" aria-hidden="true">
  <div class="modal-dialog background">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class=" modal-title text-centered text-primary" id="customerModalLabel">Seller Register</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
    <form action="">
      <div class="modal-body">
            <div class="form-group">
                <label for="Company " class="text-secondary">Company Name:</label>
                <input type="text" v-model="company" class="input">
            </div>
            <div class="form-group">
                <label for="Email" class="text-secondary">Email:</label>
                <input type="email" v-model="email" class="input">
            </div>
            <div class="form-group">
                <label for="Contact" class="text-secondary">Contact:</label>
                <input type="text" v-model="contact" class="input">
            </div>
            <div class="form-group">
                <label for="Address" class="text-secondary">Address:</label>
                <input type="text" v-model="address" class=" input">
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
    
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>