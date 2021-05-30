const sellerStore= {
    namespaced:true,
    state(){
        return{
            data:[]
        }
    },
    mutations:{
        LOAD_SELLER(state,data){
            state.data = data
        }
    },
    getters:{
        getSellers(state){
            return state.data;
        }
    },
    actions:{
        loadSeller({commit},data){
            commit('LOAD_SELLER',data);
        }
    }
}
export default sellerStore;
