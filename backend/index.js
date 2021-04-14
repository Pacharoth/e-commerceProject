const express =require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore= require('connect-mongodb-session')(session);
const cookieParser =require('cookie-parser');
const app = express();
const store = new MongoDBStore({uri:"mongodb://localhost:27017/connect_mongodb_session",collection:"Session"});
const bodyParser = require("body-parser");
store.on('err',function(error){
    console.log(error);
})
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    name:"sid",
    secret:"This is secret",
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store:store,
    resave:true,
    saveUninitialized:true,
}))
app.get('/',async(req,res)=>{
    res.json({"hello":"World"})
})
mongoose.connect("mongodb://localhost:27017/ecommerceproject?readPreference=primary&appname=MongoDB%20Compass&ssl=false").then(result=>{
    console.log("Connected DB");

}).catch(err=>console.log(err))
app.listen(3000)