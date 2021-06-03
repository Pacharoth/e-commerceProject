const feedbackStore={
    namespaced:true,
    state(){
        return{
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
        },
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
}
export default feedbackStore;