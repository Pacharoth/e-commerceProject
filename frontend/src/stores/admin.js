const adminStore={
    namespaced:true,
    state(){
        return{
            data:{},
            status:"",
            dataseller:[],

        }
    },
    mutations:{
        LOAD_SELLER(state,data){
            state.dataseller=data
        },
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
        },
        setSeller({commit},data){
            commit("LOAD_SELLER",data);
        }
    },
    getters:{
        getData(state){
            return state.data;
        },
        getStatus(state){
            return state.status;
        },
        getSeller(state){
            return state.dataseller;
        }
    }
}
export default adminStore;