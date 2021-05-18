<template>
      <div class="container">
    <h2 class="text-secondary "><strong>Customer</strong></h2>
    <div class="row">
      <table id="example" class="table table-striped" style="width:100%">
        <caption></caption>
        <thead class="bg-primary text-light">
            <th scope="">id</th>
            <th scope="">Name</th>
            <th scope="">Phone</th>
            <th scope="">Email</th>
            <th scope="">Register Date</th>
            <th scope="">Adress</th>
            <th scope="">Action</th>
        </thead>
        <admin-customers v-for="customer in customerList" :key="customer.id" :customer="customer"/>
    </table>
    </div>
    
  </div>
</template>
<script>
import AdminCustomers from './AdminCustomers';
export default {
  title:'Customer',
  name:'AdminCustomer',
  components:{
    AdminCustomers,
  },
  computed:{
    customerList(){
      return this.$store.getters['customer/getAdminCustomers'];
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';

    .container{
      margin-top:7% ;
      padding: 2%;
      height: 88%;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: white;
      box-shadow: $shadow_1;
      border-radius: 5px;
      @include breakpoint-down(small){
        margin-top: 12% ;
        width: 100%;
        height: 100%;
      }
    }
</style>