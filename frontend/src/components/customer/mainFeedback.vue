<template>
  <div class="container my-5">
		<div class="row">
			<div class="col-3">
					
			</div>
			<div class="col-6">

				<Feedback></Feedback>
				<ProductDetail></ProductDetail>

			</div>
			<div class="col-3">
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import ProductDetail from './ProductDetail'
import Feedback from './feedback'
export default {
  name: 'App',
  data() {
    return {
      localPosts: []
    }
  },
  components: {
    Feedback,
    ProductDetail,
  },
  async mounted() {
    // Get data from server
    const response = await axios.get('http://localhost:3000/feedbacks');
    // Go with this if you think this data is not shared with other component: Store data from server in local
    this.localPosts = response.data
    // Or go with this if you think this data will be reused again in other component: Store in vuex
  //  this.$store.dispatch("updatePosts", response.data)
  }
}
</script>
<style>
  @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css';
	@import 'https://use.fontawesome.com/releases/v5.6.1/css/all.css';
  .h7 {
			font-size: 0.9rem;
	}
</style>