<template>
  <div class="container">
    <h2 class="text-secondary "><strong>Customer</strong></h2>
    <div class="row">
      <table id="example" class="table table-striped" style="width:100%">
        <thead class="bg-primary text-light">
            <th><input type="checkbox" onclick="checkAll(this)"></th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Register Date</th>
            <th>Adress</th>
            <th>Action</th>
        </thead>
        <Post v-for="postItem in postList" :key="postItem.id" :postItem="postItem"></Post>
    </table>
    </div>
    
  </div>
</template>

<script>
import Post from './components/Post.vue'

export default {
  name: 'App',
  components: {
    Post
  },
  computed: {
    postList() {
      return this.$store.getters.getUsers
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
