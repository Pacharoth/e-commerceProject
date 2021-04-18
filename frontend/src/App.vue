<template>

<div class="app"> 
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
  @import './assets/sass/colorpage';
</style>

