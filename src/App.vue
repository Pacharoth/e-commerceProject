<template>
<nav class="">
  <!--<AdminLayout></AdminLayout>-->
  <!-- <Navigation></Navigation> 
  <editUser></editUser>
  <shoppingCart></shoppingCart>-->
  <postOrder></postOrder>
  <!--<feedback></feedback>-->
</nav>
</template>
<script>

//import Navigation from './components/navigation/Navigation';
//import AdminLayout from './components/layout/AdminLayout';
//import editUser from './components/customer/edit_user'
//import shoppingCart from './components/customer/shopping_cart'
//import feedback from './components/customer/feedback'
import postOrder from './components/customer/post_order'
export default {
  name: 'App',
  components: {
    //AdminLayout,
    //Navigation,
   // editUser,
   // shoppingCart,
  // feedback,
  postOrder,
  }
}
</script>

<style>

/* @import './assets/sass/customize.css'; */
</style>
