<template>
    <div class="modal fade"  id="exampleModal" ref="modal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" v-if="status=='signin'">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sign in</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body all-contain">
                <form @submit.prevent="Login">
                    <div v-if="success!==''" class="alert alert-success" role="alert">
                        {{success}}
                    </div>
                    <div>
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" required v-model="email" class="input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="youremail@website.com">
                     
                    </div>
                    <div v-if="err.email" class="alert alert-secondary mt-0 p-2 ms-0 mb-0" role="alert">
                        {{err.email}}
                    </div>
                    <div class="mt-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" v-model="password" class="input" id="exampleInputPassword1" placeholder="********fA">
                    </div>
                    <div v-if="err.password" class="alert alert-secondary mt-0 p-2 ms-0 mb-0" role="alert">
                        {{err.password}}
                    </div>
                    <button type="submit" class="button mt-3">Login</button>
                    <div class="d-flex flex-column">
                        <button class=" mt-2 mb-2 forgetpassword m-auto" @click="setStatus('forgetpassword')">forget password</button>
                       <div class="m-auto">
                            <span class="">Don't have account? </span><span><button class="forgetpassword" @click="setStatus('signup')">Sign up</button></span>
                       </div>
                    </div>
                </form>
            </div>
           
        </div>
        <div class="modal-content" v-if="status=='signup'">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sign up</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body all-contain">
                <form @submit.prevent="registerCustomer">
                    <div v-if="success!==''" class="alert alert-success" role="alert">
                        {{success}}
                    </div>
                    <div>
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="text" v-model="username" class="input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Name">
                    </div>
                     <div v-if="err.user" class="alert alert-secondary mt-0 p-2 ms-0 mb-0" role="alert">
                        {{err.user}}
                    </div>
                    <div class="mt-2">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="input" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email" placeholder="yourname@website.com">
                    </div>
                    <div v-if="err.email" class="alert alert-secondary mt-0 p-2 ms-0 mb-0" role="alert">
                        {{err.email}}
                    </div>
                    <div class="mt-2">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="input" id="exampleInputPassword1" v-model="password" placeholder="*********1Ag">
                    </div>
                    <div v-if="err.password" class="alert alert-secondary mt-0 p-2 ms-0 mb-0" role="alert">
                        {{err.password}}
                    </div>
                    <div class="mt-2">
                        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                        <input type="password" v-model="confirmpassword" class="input" id="exampleInputPassword1" placeholder="*********1Ag">
                    </div>
                    <div v-if="err.confirmpassword" class="alert alert-secondary mt-0 p-2 ms-0 mb-0" role="alert">
                        {{err.confirmpassword}}
                    </div>
                    <div class="mt-2 form-check form-search">
                        <span><input type="checkbox" class="form-check-input" required id="exampleCheck1"></span>
                        <span>I accept Terms and Conditions</span>
                    </div>
                    <button  type="submit" class="button mt-2">Sign up</button>
             
                </form>
            </div>
           
        </div>
        <div class="modal-content" v-if="status=='forgetpassword'">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Forget Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body all-contain">
                <form @submit.prevent="forgetPasswords">
                    <h6 class="text-secondary text-center fs-6 fw-bold">Please enter your email to send a reset password link</h6>
                    <div v-if="success!==''" class="alert alert-success" role="alert">
                        {{success}}
                    </div>
                    <div class="mb-2">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" v-model="email" class="input" id="exampleInputEmail1" placeholder="youremail@website.com" aria-describedby="emailHelp">
                    </div>
                    <div v-if="err.email" class="alert alert-secondary p-2" role="alert">
                        {{err.email}}
                    </div>
                    <button type="submit" class="button">Send</button>
                </form>
            </div>
           
        </div>
    </div>
</div>
</template>
<script>
import {loginForm,forgetPassword, registerAccount} from '../../utils/FormValidation';
import { ref } from '@vue/reactivity';
import { computed, onMounted } from '@vue/runtime-core';
import {useStore} from 'vuex';
export default {
    name:'LoginSignup',
    
    setup() {
        const store = useStore();
        //data
         
        const modal = ref("");  
        const username=ref("");  
        const password=ref(""); 
        const email = ref("");
        const confirmpassword=ref("");
        var err  =ref({});
        const success=ref("")
        //compute
       
        const status = computed(()=>store.getters['auth/getStatus']);
        //method
        function forgetPasswords(){
            var checkmail=false;
            forgetPassword(email.value).then(result=>checkmail=result);
            if(checkmail){
                success.value="Send "+email.value+" successful"
                setTimeout(()=>success.value="",3000);
                email.value = ""
            }else{
                err.value.email = "Email cant be found";
                setTimeout(()=>err.value.email="",3000);
            }   
        }
        function Login(){
            const check=loginForm(email.value,password.value,store,err.value);
            if(check){
                email.value="";password.value="";
                success.value="Login successful Please click out of form";
                setTimeout(()=>success.value="",3000);
            }
        }
        async function registerCustomer(){
            const data = {username,email,password,confirmpassword,err,success}
            await registerAccount(data);
        }

        //mount
        onMounted(()=>{
        })
        return{
            email,
            confirmpassword,
            modal,
            username,
            password,
            err,
            success,
            //compute
            status,

            //method
            Login,
            forgetPasswords,
            registerCustomer,
            setStatus:(status)=>store.dispatch('auth/setStatus',status),
        } 
    },

}
</script>
<style lang="scss" scope>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .modal-title{
        
        color: rgb(68, 68, 68);
        font-weight: bold ;
    }
    .all-contain{
        color: rgb(68, 68, 68);
        form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            .button{
                @extend .btn;
                background-color: #D60265;
                border-radius: 5px;
                color: white;
                font-weight: bold;
                box-shadow: $shadow_1;
                &:focus{
                    box-shadow: $shadow_2;
                    color: white;
                }
                &:hover{
                    background-color:#f0177c ;
                    color: white;
                }
            }
            .forgetpassword{
                @extend .btn;
                color: #D60265;
                
                &:hover{
                    color: #f0177c;
                }
                &:focus{
                    box-shadow: none;
                    color: #f0177c ;
                }
            }
            .input{
                @extend .form-control;
                border: none;
                color: grey;
                border-radius:10px;
                background-color:#eeee ;
                &:focus{
                    box-shadow: $shadow_2;
                    background-color: rgba(230, 225, 225, 0.933);
                    color: grey;
                }
            }
            .form-search{
                @extend .form-check;
                display: flex;
            }
        }
    }
</style>