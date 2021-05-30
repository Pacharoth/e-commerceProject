
class CheckAuth{
    constructor(req){
        this._data=req.session.userRole;
    }
    async admin(){
        if(this._data=="admin")return true;
        else return false;
    }
    async customer(){
        if(this._data=="customer")return true;
        else return false;
    }
    async seller(){
        if(this._data=="seller")return true;
        else return false;
    }
}
var admin=false;
function checkAuth(req){
    const checkauth = new CheckAuth(req);
    checkauth.admin(result=>admin=result).catch(err=>console.log(err));
    return admin;
}
module.exports =checkAuth;