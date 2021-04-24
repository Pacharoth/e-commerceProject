const notificationStore={
    namespaced:true,
    state(){
        return{
            active:'',
        }
    },
    mutations:{
        changeContent(state,text){
            state.active = text
        }
    },
    actions:{
        changeContent(context,text){
            context.commit('changeContent',text);
        }
    },
    getters:{
        getContent(state){
            return state.active;
        }
    }
};
export default notificationStore;