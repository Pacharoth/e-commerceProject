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
        loadCustomerToList(state,data){
            state.data.page=data.page
            state.adminCustomer=data.data;
        },
        changeToModal(state,data){
            state.modal = data;
        },
        deleteUser(state,data){
            state.adminCustomer=state.adminCustomer.filter(element=>element._id!==data);
        },
        setAdminCustomer(state,id){
            state.anAdminCustomer = state.adminCustomer.find(element=>element._id==id);
        },
        updateAdminCustomer(state,data){
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
            commit("loadCustomerToList",data);
        },
        changeToModal({commit},data){
            commit('changeToModal',data);
        },
        deleteUser({commit},data){
            commit('deleteUser',data);
        },
        setAdminCustomer({commit},id){
            commit('setAdminCustomer',id)
        },
        updateAdminCustomer({commit},data){
            commit('updateAdminCustomer',data);
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