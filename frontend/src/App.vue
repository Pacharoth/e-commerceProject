<template>
<nav class="">
  <!--<AdminLayout></AdminLayout>-->
  <!-- <Navigation></Navigation> -->
  <!--<editUser></editUser>-->
  <shoppingCart></shoppingCart>

</nav>
</template>
<script>

//import Navigation from './components/navigation/Navigation';
//import AdminLayout from './components/layout/AdminLayout';
//import editUser from './components/customer/edit_user'
import shoppingCart from './components/customer/shopping_cart'
export default {
  name: 'App',
  components: {
    //AdminLayout,
    //Navigation,
   // editUser,
    shoppingCart,
  }
}
</script>

<style>

/* @import './assets/sass/customize.css'; */
</style>
