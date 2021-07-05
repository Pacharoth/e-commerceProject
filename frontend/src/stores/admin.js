const adminStore={
    namespaced:true,
    state(){
        return{
            data:{},
            status:"",
        }
    },
    mutations:{
        LOAD_DATA(state,data){
            state.data=data;
        },
        LOAD_STATUS(state,data){
            state.status=data
        }
    },
    actions:{
        setData({commit},data){
            commit("LOAD_DATA",data);
        },
        setStatus({commit},data){
            commit("LOAD_STATUS",data);
        }
    },
    getters:{
        getData(state){
            return state.data;
        },
        getStatus(state){
            return state.status;
        }
    }
}
export default adminStore;