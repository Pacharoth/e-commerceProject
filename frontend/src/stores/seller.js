const sellerStore= {
    namespaced:true,
    state(){
        return{
            data:[],
            dataavg:{},
            payment:[],
        }
    },
    mutations:{
        LOAD_SELLER(state,data){
            state.data = data
        },
        LOAD_STATISTIC(state,data){
            state.dataavg= data
        },
        LOAD_PAYMENT(state,data){
            state.payment = data;
        }

    },
    getters:{
        getSellers(state){
            return state.data;
        },
        getStatistic(state){
            return state.dataavg;
        },
        getPayment(state){
            return state.payment;
        }
    },
    actions:{
        loadSeller({commit},data){
            commit('LOAD_SELLER',data);
        },
        loadStatistic({commit},data){
            commit('LOAD_STATISTIC',data);
        },
        loadPayment({commit},data){
            commit('LOAD_PAYMENT',data);
        }
    }
    
}
export default sellerStore;
