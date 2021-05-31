
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
        SET_STATUS(state,text){
            state.status=text
        },
        SET_SESSION(state,{userid,user,role,email}){
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
            commit('SET_STATUS',text);
        },
        setSession({commit},result){
            try{
                var responses = result.data!==null;
                if(responses){
                    let response=result.data
                    commit('SET_SESSION',{
                        userid:response.userId,
                        user:response.username,
                        role:response.userRole,
                        email:response.email,
                    }); 
                }
            }catch(err){
                commit('SET_SESSION',{user:'',role:'',email:'',userid:''});
            }
            
        }
    },
    getters:{
        getStatus(state){
            return state.status;
        },
        
        getSession(state){
            return state.isAuthenticate;
        },
        
    }
}

export default authStore;