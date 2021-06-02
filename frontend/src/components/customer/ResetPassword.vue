<template>
    <div class="resetpwd-container">
        <form action="" @submit.prevent="resetPassword">
            <h5 class="fw-bold">Reset Password</h5>
            <hr>
            <div v-if="result.err==true" class="alert alert-success" role="alert">
                {{result.result}}
            </div>
            <div v-else-if="result.err==false" class="alert alert-warning" role="alert">
                {{result.result}}
            </div>
            <div class="mb-2">
                <label for="exampleInputPassword1" class="form-label">Account:{{user.email}}</label>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" v-model="password" required class="form-control" >
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Confirm password</label>
                <input type="password" v-model="confirmPassword" required class="form-control" >
            </div>
            <button type="submit" >Save Change</button>
        </form>
    </div>
</template>
<script>
import { onMounted, ref, toRefs } from '@vue/runtime-core';
import axios from 'axios';
import { FormValidation, localhost } from '../../utils/FormValidation';
import router from '../../routers/route'
export default {
    name:"ResetPassword",
    title:"Reset Password",
    props:['id'],
    
    setup(props) {
        const {id}  = toRefs(props)
        const user = ref({});
        const result = ref({});
        const password = ref("");
        const confirmPassword = ref("");
        onMounted(async ()=>{
            const response = await axios.get(localhost+'/resetpassword/'+id.value);
            if(response.data.length>0){
                user.value=response.data[0];
            }
        });
        async function resetPassword(){
            const form = new FormValidation();
            form._setPassword(password.value);
            form._setConfirmPassword(confirmPassword.value);
            console.log(form.checkPassword(),form.checkValidatePassword());
            if(form.checkValidatePassword()==false){
                result.value.err=true;
                result.value.result ="Password Invalid!8 characters 1 upper 1 lower and 1 number"; 
                setTimeout(()=>result.value="",3000);
            
            }else if(form.checkPassword()==false){
                result.value.err = false;
                result.value.result= "Password Not Match";
                setTimeout(()=>result.value="",3000);
            }
            
            if((form.checkPassword()&&form.checkValidatePassword())==true){
                const response =await axios.put(localhost+'/resetpassword/'+id.value,{password:password.value});
                if(response.data.err){
                    result.value.result= response.data.result
                    setTimeout(()=>result.value="",3000);
                }else{
                    result.value.result=response.data.result;
                    alert("Password has been resetted");
                    setTimeout(()=>result.value="",3000);
                    user.value={}
                    password.value=""
                    router.push({path:'/'});

                   
                }
            }
        }
        return{
            user,
            resetPassword,
            result,
            password,
            confirmPassword,
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .resetpwd-container{
        width: 40%;
        margin: auto;
        margin-top: 2%;
        padding: 2%;
        background-color: white;
        box-shadow: $shadow_1;
        border-radius: 10px;
        input{
            background-color: #eee;
            border: none;
            border-radius: 50px;
            color: grey;
            &:hover,&:focus{
                border:none;
                background-color: rgba(238, 238, 238, 0.747);
                box-shadow: $shadow_2;
            }
        }
        button{
            @extend .btn;
            border: none;
            background-color: #c01464d8;
            color: white;
            border-radius: 5px;
            margin: auto;
            &:hover,&:focus{
                box-shadow: $shadow_1;
                background-color: #e61c7ab2;
                color: white;
                border: none;
            }
        }
        @include breakpoint-down(small){
            width: 60%;
        }
    }
</style>