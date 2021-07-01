const sellerStore= {
    namespaced:true,
    state(){
        return{
            data:[],
            dataavg:{},
        }
    },
    mutations:{
        LOAD_SELLER(state,data){
            state.data = data
        },
        LOAD_STATISTIC(state,data){
            state.dataavg= data
        }

    },
    getters:{
        getSellers(state){
            return state.data;
        },
        getStatistic(state){
            return state.dataavg;
        }
    },
    actions:{
        loadSeller({commit},data){
            commit('LOAD_SELLER',data);
        },
        loadStatistic({commit},data){
            commit('LOAD_STATISTIC',data);
        }
    }
    
}
export default sellerStore;
