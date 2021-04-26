<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content" v-if="status=='signin'">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sign in</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body all-contain">
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="input" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="input" id="exampleInputPassword1">
                    </div>
                    
                    <button type="submit" class="button">Login</button>
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
                <form>
                    <div class="mb-2">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="email" class="input" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-2">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="input" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-2">
                        <label for="exampleInputEmail1" class="form-label">Address</label>
                        <input type="email" class="input" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-2">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="input" id="exampleInputPassword1">
                    </div>
                    <div class="mb-2">
                        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                        <input type="password" class="input" id="exampleInputPassword1">
                    </div>
                    <div class="mb-2 form-check form-search">
                        <span><input type="checkbox" class="form-check-input" id="exampleCheck1"></span>
                        <span>I accept Terms and Conditions</span>
                    </div>
                    <button type="submit" class="button">Sign up</button>
             
                </form>
            </div>
           
        </div>
        <div class="modal-content" v-if="status=='forgetpassword'">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Forget Password</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body all-contain">
                <form>
                    <h6 class="text-secondary text-center fs-6 fw-bold">Please enter your email to send a reset password link</h6>
                    <div class="mb-2">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="input" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <button type="submit" class="button">Send</button>
                </form>
            </div>
           
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:'LoginSignup',
    computed:{
        status(){
            return this.$store.getters['auth/getStatus']
        }
    },
    methods: {
        setStatus(status){
            const store = this.$store
            store.dispatch('auth/setStatus',status);
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