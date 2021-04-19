<template>
      <div class="container">
    <h2 class="text-secondary "><strong>Customer</strong></h2>
    <div class="row">
      <table id="example" class="table table-striped" style="width:100%">
        <caption></caption>
        <thead class="bg-primary text-light">
            <th scope=""><input type="checkbox" onclick="checkAll(this)"></th>
            <th scope="">Name</th>
            <th scope="">Phone</th>
            <th scope="">Email</th>
            <th scope="">Register Date</th>
            <th scope="">Adress</th>
            <th scope="">Action</th>
        </thead>
        <CustomerAdminList v-for="postItem in postList" :key="postItem.id" :postItem="postItem"></CustomerAdminList>
    </table>
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