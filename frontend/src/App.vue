<template>
<nav class="">
  <AdminLayout></AdminLayout>
  <!-- <Navigation></Navigation> -->
</nav>
</template>
<script>
// import Navigation from './components/navigation/Navigation';
import AdminLayout from './components/layout/AdminLayout';
export default {
  name: 'App',
  components: {
    AdminLayout,
    // Navigation,
  }
}
</script>

<style>

/* @import './assets/sass/customize.css'; */
</style>
