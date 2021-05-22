const rolesStore={
    namespaced:true,
    state(){
        return{
            roles:[]
        }
    },
    mutations:{
        ADD_ROLES(state,data){
            state.roles=data
        },

    },
    getters:{
        getRoles(state){
            return state.roles
        },
        getRole:(state)=>(id)=>{
            return state.roles.find(element=>element._id===id);
        }
    },
    actions:{
        addRole({commit},data){
            commit('ADD_ROLES',data);
        }
    }

}
export default rolesStore;