<template>
<div> 
  <navBar></navBar>
  <category></category>
  <customer></customer>

</div>

</template>

<script>
import navBar from './components/navBar'
import category from './components/categoryDropdown'
import customer from './components/customer'
export default {
  name: 'App',
  components: {
   navBar,
   category,
   customer
  }
}
</script>

<style>

</style>
