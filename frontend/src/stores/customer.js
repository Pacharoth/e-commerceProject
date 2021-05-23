const customerStore={
    namespaced:true,
    state(){
        return {
            data: {
                page:0,
                filter:"",
            },
            adminCustomer: []
        }
    },
    mutations:{
        loadCustomerToList(state,data){
            state.data.page=data.page
            state.adminCustomer=data.data;
        }
    },
    actions:{
        loadCustomerToList({commit},data){
            commit("loadCustomerToList",data);
        }
    },
    getters:{
        getPage(state){
            return state.data.page;
        },
        getAdminCustomers(state){
            return state.adminCustomer;
        }
    }
}
export default customerStore;