import axios from 'axios';
const localhost="http://localhost:3000"
class FormValidation{
    _setLoginForm(email,password){
        this._email = email;
        this._password= password;
    }
    _setSignUpForm(email,password,confirmpassword){
        this._email = email;
        this._password = password,
        this._confirmPassword=confirmpassword;
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
    async checkEmail(){
        if(this._email){
            await axios.post('http://localhost:3000/email',this._email).then(
                result=>{
                    if(result.data.email){
                        return false;
                        
                    }
                }
            )
        }else{
            return false;
        }
    }
    checkValidateEmail(){
        const emailValid=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.(?:\.[a-zA-Z0-9-]+)$/
        if(this._email == ""){
            return "email require";
        }else if(emailValid.test(this._email)){
            return "Email Invalid";
        }else{
            return true;
        }
    }
    checkPassword(){
        if(this._email!==this._confirmPassword) return false;
        else return true;
    }
    checkValidatePassword(){
        //^ mean start (?=.*[a-z]) at least one symbol lowercasr
        //(?=.*[A-Z]) at least one uppercase
        //(?=.*[0-9]) at least on number
        //(?=.*[!@#$%^&*]]) at least one special but I wont use it
        //(?=.{8,}) range 8 character up
        const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
        if(validatePassword.test(this._password)){
            return true;
        }
        else{
            return false;
        }
    }
}
async function loginForm(email,password,store){
    await axios.post(localhost+'/login',{email,password}).then(
        async result=>{
            store.dispatch('auth/setSession',result);
            localStorage.username=result.data.username;
            localStorage.userid=result.data.userId;
            localStorage.userrole=result.data.userRole;
            localStorage.useremail = result.data.email;
            email=""
            password=""
        }
    )
}
async function forgetPassword(email){
    try{
        await axios.post(localhost+'/forgetpassword',{email}).then(
        async result=>{
            await localStorage.setItem('data',result.data)
            email="";
        }
        )
    }catch(err){
        console.log("");
    }
}
export{
    FormValidation, 
    loginForm,
    forgetPassword,
}