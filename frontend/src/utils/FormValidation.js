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
                        return true;
                        
                    }
                }
            )
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
async function loginForm(email,password,store,err){
    const formValidate = new FormValidation();
    formValidate._setLoginForm(email,password);
    const checkValidateEmail=formValidate.checkValidateEmail()
    if(checkValidateEmail!==true){
        err.email = checkValidateEmail;
        setTimeout(()=>err.email="",2000)
        return false;
    }
    else{
        await axios.post(localhost+'/login',{email:email,password:password}).then(
            async result=>{

                if(result.data.email){
                    store.dispatch('auth/setSession',result);
                    localStorage.username=result.data.username;
                    localStorage.userid=result.data.userId;
                    localStorage.userrole=result.data.userRole;
                    localStorage.useremail = result.data.email;
                    return true
                }else{
                    err.password=result.data.password
                    setTimeout(()=>err.password="",2000)
                    return false
                }
                
            }
        )
    }
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
async function registerAccount(data){
    var {username,email,password,confirmpassword,err,success}=data
    
    const formValidate = new FormValidation();
    formValidate._setSignUpForm(email,password,confirmpassword);
    const [pairPassword,checkValidateEmail,checkValidatePassword]=[
        
        formValidate.checkPassword(),
        formValidate.checkValidateEmail(),
        formValidate.checkValidatePassword(),
    ]
    var checkEmail=false;
    formValidate.checkEmail().then(result=>checkEmail=result)
    const result =checkEmail&&!pairPassword&&checkValidateEmail!==true&&!checkValidatePassword;
    if(result){
        if(checkEmail)err.email = "Email has already existed!";
        if(!pairPassword)err.confirmpassword = "Password is not matched"
        if(!checkValidateEmail)err.email = checkValidateEmail;
        if(!checkValidatePassword)err.password = "Password should contain at least 1 letter(),1 number and 8 digits up"
        setTimeout(()=>err={},2000);
        success;
    }
    else{
        await axios.post(localhost+'/register',{
            username,
            email,
            password,
        }).then(result=>{
            if(result){
                username = "";email="";confirmpassword="";password="";
                success= username+" has been created";
                setTimeout(()=>()=>success="",2000);

            }
        })
    }
}
export{
    FormValidation, 
    loginForm,
    forgetPassword,
    registerAccount,
}