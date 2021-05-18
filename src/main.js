import { createApp } from 'vue'
import {createStore} from 'vuex'
import App from './App.vue'
import router from './routers/route';
//import store from './stores/store';
const app = createApp(App);
app.mixin({
    created(){
        const {title}=this.$options
        if(title){
            document.title=title;
        }
    }
});


const store1 = createStore({
    state() {
      return {
        feedbacks: [],
        user: {}
      }
    },
    mutations: {
      UPDATE_FEEDBACKS(state, feedbacks) {
        console.log('mutations', feedbacks)
        state.feedbacks = feedbacks
      },
      UPDATE_USER(state, user) {
        state.user = user
      }
    },
    actions: {
      updateFeedbacks(context, feedbacks) {
        console.log('actions', feedbacks)
        context.commit('UPDATE_FEEDBACKS', feedbacks)
      }
    },
    getters: {
      getFeedbacks(state) {
        return state.feedbacks
      },
      getUser(state) {
        return state.user
      }
    }
  })
app.use(store1)
//app.use(store);
app.use(router);
app.mount('#app');
