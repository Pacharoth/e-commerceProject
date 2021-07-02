<template>
    <div  class="modal fade" id="sellerModal" ref="modal" tabindex="-1" aria-labelledby="sellerModalLabel" aria-hidden="true">
        <div v-if="!user.userid" class="modal-dialog">
            <form class="modal-content" @submit.prevent="registerSellerPayment" ref="form">
                <div class="modal-header">
                    <h5 class="modal-title" id="sellerModalLabel">Register Seller</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body seller-register">
                    <div class="row ">
                        <div class="col mb-1">
                            <label>Username</label>
                            <input type="text" name="username" placeholder="username" class="form-control">
                        </div>
                        <div class="col mb-1">
                            <label>Company's Name</label>
                            <input type="text" name="company" placeholder="compnay's name" class="form-control">
                            <div v-if="err.company" class="alert alert-warning p-1 m-0 mt-2 mb-0" role="alert">
                                {{err.company}}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-1">
                            <label for="Contact">Contact</label>
                            <input type="text" class="form-control" placeholder="phone number" name="contact">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-1">
                            <label for="Contact">Address</label>
                            <input type="text" class="form-control" placeholder="address" name="address">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-1">
                            <label for="" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="" placeholder="yoursite@email.com" aria-describedby="emailHelp" name="email">
                            <div v-if="err.email" class="alert alert-warning p-1 m-0 mt-2 mb-0" role="alert">
                                {{err.email}}
                            </div>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="col mb-1">
                            <label for="" class="form-label">Password</label>
                            <input type="password" class="form-control"  placeholder="******"  id="" aria-describedby="emailHelp" name="password">
                        </div>
                    </div>
                     <div class="row mb-3">
                        <div class="col">
                            <label for="" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" placeholder="******" id="" aria-describedby="emailHelp" name="confirmpassword">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button type="submit" class="form-control btn fw-bold">Sign up</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
         <div v-else class="modal-dialog modal-lg">
            <form class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sellerModalLabel">Payment Subscribe Plan</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-subscription">
                        <h3>Please choose plan to continue subscribing</h3>
                        <div class="plan-container">
                            <div v-if="type=='month'" class="payment-container">
                                <h5>Monthly</h5>
                                <div class="line-pp"></div>
                                <h4>${{value}}</h4>
                                <ul>
                                    <li>valid a month + 10days</li>
                                    <li>Support technical</li>
                                    <li>Include Free Function</li>
                                    <li>Boost Product</li>
                                </ul>
                                <div class="pay" ref="monthly"></div>
                            </div>
                            <div v-if="type=='year'" class="payment-container">
                                <h5>Annually</h5>
                                <div class="line-pp"></div>
                                <h4>${{value}}</h4>
                                <ul>
                                    <li>valid 1 year 30 days</li>
                                    <li>Support technical</li>
                                    <li>Include Free Function</li>
                                    <li>Boost Product</li>
                                </ul>
                                    <div class="paypal" ref="yearly"></div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { computed, onMounted, ref, toRefs, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { insertPayPalSeller } from '../../utils/paypal';
import { useRouter } from 'vue-router';
import { FormValidation } from '../../utils/FormValidation';
export default {
    name:"FormRegisterPayment",
    props:['value','type'],
    setup(props) {
        const store = useStore(),
        {type,value} = toRefs(props),
        form=ref(null),
        err = ref({}),
        router = useRouter(),
        monthly=ref(null),
        yearly=ref(null),
        user = computed(()=>store.getters['auth/getSession']);
        watch(type,async()=>{
            if(user.value.userid){
                await loadData();
            }
        })
        onMounted(async()=>{
            if(user.value.userid){
                await loadData();
            }
        })
        async function registerSellerPayment(){
            var aForm = new FormData(form.value);
            var validation = new FormValidation()
            var [username,email,password,confirmpassword]=[
                aForm.get('username'),
                aForm.get('email'),
                aForm.get('password'),
                aForm.get('confirmpassword'),
            ]
            validation._setSignUpForm(username,email,password,confirmpassword);
            validation._setCompany(aForm.get('company'));
            var checkEmail =await validation.checkEmail();
            console.log(checkEmail);
            var checkCompany = await validation.checkCompany();
            var checkPassword = validation.checkPassword();
            console.log(checkPassword);
            if(checkCompany){
                err.value.company = validation._getCompany()+" already exists";
            }
            if(checkEmail){
                err.value.email = validation._getEmail()+" already exists";
            }
            setTimeout(()=>err.value={},3000);
            aForm.get('password').value="";
            console.log(checkCompany);

            

        }
        async function loadData(){
            if(type.value=='month'){
                await insertPayPalSeller({
                    total:value,
                    paypal:monthly,
                    user:user,
                    type:'pay',
                    router:router,
                })
            }else if(type.value=='year'){
                 await insertPayPalSeller({
                    total:value,
                    paypal:yearly,
                    user:user,
                    type:'pay',
                })
            }
        }
       
        return{
            err,
            form,
            user,
            monthly,
            yearly,
            registerSellerPayment,
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .container-subscription{
        width: 100%;
        .plan-container{
            width: 100%;
            .payment-container{
                width: 60%;
            }
        }
    }   
    .seller-register{
        input{
            border: none;
            box-shadow: $shadow_1;
            border-radius: 5px;
            background:#eee ;
            // color: rgb(92, 92, 92);
            &:hover,&:focus{
                background:#eee ;
                box-shadow: $shadow_2;
            }
        }
        label{
            // color:gray;
            font-weight: 500;
        }
        button{
            background: #D60265;
            color: white;
            box-shadow: $shadow_1;
            border-radius: 5px;
            &:hover,&:focus{
                color: white;
                background: #d81c74;
                box-shadow: $shadow_2;
            }
        }
    }

</style>