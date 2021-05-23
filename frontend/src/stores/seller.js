const sellerStore= {
    namespaced:true,
    state(){
        return{
            data:[]
        }
    },
    mutations:{
        loadSeller(state,data){
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
            commit('loadSeller',data);
        }
    }
}
export default sellerStore;
