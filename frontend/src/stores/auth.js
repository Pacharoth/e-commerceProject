
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
                img:"",
            },
        }
    },
    mutations:{
        SET_STATUS(state,text){
            state.status=text
        },
        SET_SESSION(state,{userid,user,role,email,img}){
            state.isAuthenticate={
                userid,
                user,
                role,
                email,
                img,
            }
        },
        UPDATE_SESSION(state,data){                                                                                                                                                                                                                                                                                                               
            var {email,user}=data
            state.isAuthenticate.user =user;
            state.isAuthenticate.email=email                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        },
        UPDATE_IMAGE(state,img){
            state.isAuthenticate.img = img
        }
    },                                          
    actions:{
        updateImg({commit},img){
            commit("UPDATE_IMAGE",img);
        },
        setStatus({commit},text){
            commit('SET_STATUS',text);
        },
        updateSession({commit},result){
            console.log(result)
            commit("UPDATE_SESSION",result);
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
                        img:response.img,
                    }); 
                }
            }catch(err){
                commit('SET_SESSION',{user:'',role:'',email:'',userid:'',img:''});
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