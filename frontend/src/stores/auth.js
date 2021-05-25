
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
        setSession({commit},result){
            try{
                var responses = result.data!==null;
                if(responses){
                    let response=result.data
                    commit('setSession',{
                        userid:response.userId,
                        user:response.username,
                        role:response.userRole,
                        email:response.email,
                    }); 
                }
            }catch(err){
                commit('setSession',{user:'',role:'',email:'',userid:''});
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