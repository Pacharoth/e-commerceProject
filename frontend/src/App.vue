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
    @import 'https://use.fontawesome.com/releases/v5.8.1/css/solid.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.0/css/fontawesome.min.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    @import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css';
</style>
