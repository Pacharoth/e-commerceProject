
const authStore = {
    namespaced:true,
    state(){
        return{
            status:'signin',
            isAuthenticate:{
                userid:"",
                user:"",
                isRole:"",
                email:"",
            },
        }
    },
    mutations:{
        setStatus(state,text){
            state.status=text
        },
        setSession(state,{userid,user,role,email}){
            state.isAuthenticate={
                userid,
                user,
                role,
                email,
            }
        }
    },
    actions:{
        setStatus({commit},text){
            commit('setStatus',text);
        },
        async setSession({commit},result){
            const response = result.data
            
            if(response){
                commit('setSession',{
                    userid:response.userId,
                    user:response.username,
                    role:response.userRole,
                    email:response.email,
                });
            }else return 
        }
    },
    getters:{
        getStatus(state){
            return state.status;
        },
        
        async getSession(state){
            return state.isAuthenticate;
        },
        
    }
}

export default authStore;