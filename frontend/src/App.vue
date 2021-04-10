<template>
<nav class="">
  <AdminLayout></AdminLayout>
</nav>
</template>
<script>
import AdminLayout from './components/layout/AdminLayout';
export default {
  name: 'App',
  components: {
    AdminLayout,
  }
}
</script>

<style>
@import './assets/sass/customize.css';
</style>
