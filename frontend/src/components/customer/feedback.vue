<template>
  <div class="container">
      <h4 class="header">Feedback</h4>
      <div class="line"></div>
      <section v-for="feedback in getFeedbacks" :key="feedback.id">
      <div class="row1">
        <div class="column1">
          <h6>{{feedback.users.username}}</h6>
        </div>

        <div class="column2">
          <p style="font-size: 11px">{{new Date(feedback.postedAt).toLocaleDateString()}}</p>
          <p>{{feedback.content}}</p>
        </div>

        <!-- <div class="column3">
          <button class="btn2">Reply</button>
        </div> -->
      </div>
    </section>
    <button class="btn1">see more</button>
  </div>
</template>


<script>
import axios from 'axios'
// import { mapGetters } from 'vuex'
export default {
    name: 'App',
    props:['id'],
    data() {
        return {
            localFeedbacks: []
        }
    },
    components: {
    },
    async mounted() {
        // Get data from server
        const response = await axios.get('http://localhost:3000/feedbacks/'+this.id);
        // Go with this if you think this data is not shared with other component: Store data from server in local
         this.localFeedbacks = response.data
         this.$store.dispatch('feedback/updateFeedbacks',response.data)
        // Or go with this if you think this data will be reused again in other component: Store in vuex
        //this.$store.dispatch("updateFeedbacks", response.data)
    },
    computed: {
    //     ...mapGetters([
    //     "feedback/getFeedbacks"
    // ]), // mapGetters() will return ["getFeedbacks"] => "getFeedbacks"
    getFeedbacks(){
        return this.$store.getters['feedback/getFeedbacks']
    }
  }
}
</script>
<style>
  * {
   box-sizing: border-box;
  }
  .header{
    color: #D60265;
    margin-bottom: 3%;
    margin-top: 3%;
  }
  .line{
    border: 1px solid #D60265;
    width: 100%;
    margin-bottom: 2%;
  }
  .column1 {
    float: left;
    width: 20%;
    padding: 10px; 
  }
  .column2 {
    float: left;
    width: 60%;
    padding: 10px;
  }
  .column3 {
    float: left;
    width: 20%;
    padding: 10px;
  }
  /* Clear floats after the columns */
  .row1:after {
    content: "";
    display: flex;
    clear: both;
  }
  .btn1{
    border: none;
    background-color: white;
    color: #aaa;
    margin-left: 50%;
    font-size: 15px;
  }
  .btn2{
    border: none;
    background-color: white;
    color: #aaa;
    font-weight: bold;
  }
  /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .column {
      width: 100%;
    }
  }
</style>