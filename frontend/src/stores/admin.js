const adminStore={
    namespaced:true,
    state(){
        return{
            data:{},
        }
    },
    mutations:{
        LOAD_DATA(state,data){
            state.data=data;
        }
    },
    actions:{
        setData({commit},data){
            commit("LOAD_DATA",data);
        },
    },
    getters:{
        getData(state){
            return state.data;
        }
    }
}
export default adminStore;