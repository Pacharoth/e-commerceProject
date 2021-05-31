const notificationStore={
    namespaced:true,
    state(){
        return{
            active:'',
        }
    },
    mutations:{
        CHANGE_CONTENT(state,text){
            state.active = text
        }
    },
    actions:{
        changeContent({commit},text){
            commit('CHANGE_CONTENT',text);
        }
    },
    getters:{
        getContent(state){
            return state.active;
        }
    }
};
export default notificationStore;