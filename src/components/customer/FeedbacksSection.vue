<template>
  <div class="container my-5">
		<div class="row">
				<!-- Post Begins -->
				<section v-for="feedback in getFeedbacks" :key="feedback.id" class="card mt-4">
						<!-- post header -->
						<div class="row m-0">
							<div class="">
							</div>
							<div class="flex-grow-1 pl-2">
								<a class="text-decoration-none" href="#">
									<h2 class="text-capitalize h5 mb-0" style="color: #D60265">Lykong</h2>
								</a> 
								<p class="small text-secondary m-0 mt-1">2021-05-18</p>
							</div>
							
						</div>
						<!-- post body -->
						<div class="">
							<p class="my-2">
								{{feedback.content}}
							</p>
						</div>
						<footer class="content1">
							<!-- post actions -->
							<div class="">
								<ul class="list-group list-group-horizontal">
									<li class="list-group-item flex-fill text-center p-0 px-lg-2 border border-right-0 border-top-0 border-bottom-0 ">
										<a class="small text-decoration-none" href="#">
											<i class="fas fa-share"  style="font-size:15px;color:#d60265;">
Reply</i> 
										</a>
									</li>
								</ul>
							</div>

						</footer>

				</section>
				<!-- Post Ends -->
		
		</div>
	</div>
</template>


<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'App',
    data() {
        return {
            localFeedbacks: []
        }
    },
    components: {
    },
    async mounted() {
        // Get data from server
        const response = await axios.get('http://localhost:3000/feedbacks');
        // Go with this if you think this data is not shared with other component: Store data from server in local
        // this.localFeedbacks = response.data
        // Or go with this if you think this data will be reused again in other component: Store in vuex
        this.$store.dispatch("updateFeedbacks", response.data)
    },
    computed: {
        ...mapGetters([
        "getFeedbacks"
    ]), // mapGetters() will return ["getFeedbacks"] => "getFeedbacks"
  }
}
</script>
<style>
    @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css';
	@import 'https://use.fontawesome.com/releases/v5.6.1/css/all.css';
    .h7 {
		font-size: 0.9rem;
	}
    .continer1{
        margin-left: 50%;
    }
    .content1{
        float: right;
    }
</style>