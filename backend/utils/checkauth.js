class CheckAuth{
    constructor(req){
        this._data=req.session.userRole;
    }
    async admin(){
        (this._data=="admin")?true:false;
    }
    async customer(){
        (this._data=="customer")?true:false;
    }
    async seller(){
        (this._data=="seller")?true:false;
    }
}
module.exports =CheckAuth;