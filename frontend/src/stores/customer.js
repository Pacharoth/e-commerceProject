const customerStore={
    namespaced:true,
    state(){
        return {
            data: {
                page:0,
                filter:"",
            },
            adminCustomer: [],
            modal:"",
            anAdminCustomer:{},
        }
    },
    mutations:{
        LOAD_CUSTOMER_TO_LIST(state,data){
            state.data.page=data.page
            state.adminCustomer=data.data;
        },
        CHANGE_TO_MODAL(state,data){
            state.modal = data;
        },
        DELETE_USER(state,data){
            state.adminCustomer=state.adminCustomer.filter(element=>element._id!==data);
        },
        SET_ADMIN_CUSTOMER(state,id){
            state.anAdminCustomer = state.adminCustomer.find(element=>element._id==id);
        },
        UPDATE_ADMIN_CUSTOMER(state,data){
            const {_id,email,username,phoneNumber}=data;
            console.log(email,username,phoneNumber)
            const index = state.adminCustomer.findIndex(element=>element._id===_id);
            const datas = state.adminCustomer.filter(element=>{
                if(element._id===_id){
                    element.users.username= username;
                    element.users.email =email ;
                    element.phoneNumber=phoneNumber;
                }
                return element;
            });
            state.adminCustomer[index]={...state.adminCustomer[index],datas};
        }
        
    },
    actions:{
        loadCustomerToList({commit},data){
            commit("LOAD_CUSTOMER_TO_LIST",data);
        },
        changeToModal({commit},data){
            commit('CHANGE_TO_MODAL',data);
        },
        deleteUser({commit},data){
            commit('DELETE_USER',data);
        },
        setAdminCustomer({commit},id){
            commit('SET_ADMIN_CUSTOMER',id)
        },
        updateAdminCustomer({commit},data){
            commit('UPDATE_ADMIN_CUSTOMER',data);
        }
    },
    getters:{
        getPage(state){
            return state.data.page;
        },
        getAdminCustomers(state){
            return state.adminCustomer;
        },
        getModal(state){
            return state.modal;
        },
        getAnAdminCustomer(state){
            return state.anAdminCustomer;
        }
    }
}
export default customerStore;