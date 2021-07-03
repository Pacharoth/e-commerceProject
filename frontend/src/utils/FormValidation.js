import axios from 'axios';
import router from '../routers/route';
const localhost="http://localhost:3000"
const validatePhoneNumber = /^(\+|0){1}\d{5,15}$/;
class FormValidation{
    _setLoginForm(email,password){
        this._email = email;
        this._password= password;
    }
    _setSignUpForm(username,email,password,confirmpassword){
        this._username=username
        this._email = email;
        this._password = password,
        this._confirmPassword=confirmpassword;
    }
    _setCompany(company){
        this._company = company;
    }
    _getCompany(){
        return this._company;
    }
    _setEmail(email){
        this._email = email;
    }
    _getEmail(){
        return this._email;
    }
    _setPassword(password){
        this._password = password;
    }
    _setConfirmPassword(confirmpassword){
        this._confirmPassword=confirmpassword;
    }
    async checkEmail(){
        if(this._email){
            var {data}=await axios.post('http://localhost:3000/email',{email:this._email});
            if(data.length>0){
                return true;
            }
        }else{
            return false;
        }
    }
    async checkCompany(){
        if(this._company){
            var {data}=await axios.post(localhost+'/company',{company:this._company});
            if(data.length>0)return true
            else return false;
        }else{
            return false;
        }
    }
    checkValidateEmail(){
        const emailValid=  /[a-zA-Z]+[0-9]+@[a-zA-Z]+\.com/
        if(this._email == ""){
            return "email require";
        }else if(!emailValid.test(this._email)){
            return "Email Invalid!";
        }else{
            return true;
        }
    }
    checkPassword(){
        if(this._password!==this._confirmPassword) return false;
        else return true;
    }
    checkValidatePassword(){
        //^ mean start (?=.*[a-z]) at least one symbol lowercasr
        //(?=.*[A-Z]) at least one uppercase
        //(?=.*[0-9]) at least on number
        //(?=.*[!@#$%^&*]]) at least one special but I wont use it
        //(?=.{8,}) range 8 character up
        const validatePassword = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        console.log(validatePassword.test(this._password))
        if(validatePassword.test(this._password)){
            return true;
        }
        else{
            console.log("false")
            return false;
        }
    }
}
async function loginForm(email,password,store,err,success,newModal){
    await axios.post(localhost+'/login',{email:email.value,password:password.value}).then(
        async result=>{
            if(result.data.username!==undefined){
                store.dispatch('auth/setSession',result);
                localStorage.username=result.data.username;
                localStorage.userid=result.data.userId;
                localStorage.userrole=result.data.userRole;
                localStorage.useremail = result.data.email;
                localStorage.img = result.data.img;
                email.value=""
                password.value=""
                success.value = "Login successful!";
                setTimeout(()=>{
                    success.value="";
                    newModal.value.hide()
                },1000);
            }else if(result.data.err!==undefined){
                if(result.data.passwordErr===true){

                    err.value.password=result.data.err
                }
                else if(result.data.emailErr===true){
                    
                    err.value.email = result.data.err
                    
                }
                setTimeout(()=>err.value={},2000)
            }
            
        }
    )
    
}
async function forgetPassword(email){
    try{
        await axios.post(localhost+'/forgetpassword',{email:email}).then(
        async result=>{
            console.log(result.data)
            if(result.data.send){
                return true;
            }else{
                return false
            }
        }
        )
    }catch(err){
        return false;
    }
}
async function registerAccount(data){
    var {username,email,password,confirmpassword,err,success,newModal}=data
    
    const formValidate = new FormValidation();
    console.log(email.value,password.value,confirmpassword.value,username)
    formValidate._setSignUpForm(username.value,email.value,password.value,confirmpassword.value);
    const [pairPassword,checkValidateEmail,checkValidatePassword]=[
        formValidate.checkPassword(),
        formValidate.checkValidateEmail(),
        formValidate.checkValidatePassword(),
    ]
    var checkEmail=false;
    await axios.post('http://localhost:3000/email',{email:email.value}).then(
        result=>{
            if(result.data.length<=0){
                checkEmail=true;
            }
        }
    )
    const result =checkEmail&&pairPassword&&checkValidatePassword;
    console.log(checkEmail,pairPassword,checkValidateEmail,checkValidatePassword)
    if(result==false){
        if(checkEmail===false)err.value.email = "Email has already existed!";
        if(pairPassword===false)err.value.confirmpassword = "Password is not matched"
        if(checkValidatePassword===false)err.value.password = "Password should contain at least 1 letter(),1 number and 8 digits up"
        setTimeout(()=>err.value={},2000);
    }
    else{
        await axios.post(localhost+'/register',{
            username: username.value, 
            email: email.value,
            password: password.value 
            
        }).then(result=>{

            if(result.data._id){
                success.value= username.value+" has been created";
                router.push({name:"customerlistproduct"})
                alert(username.value+"has been registered");
                username.value = "";email.value="";confirmpassword.value="";password.value="";
                setTimeout(()=>()=> success.value="",2000);
                newModal.value.hide();
            }
        })
    }
}
function logouts(store){
    localStorage.clear();
    store.dispatch('auth/setSession',null);
}
export{
    FormValidation, 
    loginForm,
    forgetPassword,
    registerAccount,
    logouts,
    localhost,
    validatePhoneNumber,
}