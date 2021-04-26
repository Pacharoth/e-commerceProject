import axios from 'axios';
const localhost = 'http://localhost:3000/';
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
            }
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
        async setSession({commit}){
            await axios.post(localhost+'getSession').then(result=>{
                const response = result.data
                commit('setSession',{
                    userid:response.userId,
                    user:response.username,
                    role:response.userRole,
                    email:response.email,
                });
            }).catch(error=>console.log(error));
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