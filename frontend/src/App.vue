<template>
<div class="app" style=""> 
  <router-view></router-view>
</div>
</template>
<script>
export default {
  data(){
    return{
      path:window.location.pathname,
    }
  },
  name: 'App',
  components:{
  }
}
</script>
<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import './assets/sass/colorpage';
    body{
    @extend body;
    background: #F5F5F5 !important;
  }
</style>

