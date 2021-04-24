const authStore = {
    namespaced:true,
    state(){
        return{
            status:'signin',
        }
    },
    mutations:{
        setStatus(state,text){
            state.status=text
        }
    },
    actions:{
        setStatus({commit},text){
            commit('setStatus',text);
        }
    },
    getters:{
        getStatus(state){
            return state.status;
        }
    }
}
export default authStore;