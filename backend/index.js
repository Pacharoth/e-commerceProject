const express =require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore= require('connect-mongodb-session')(session);
const cookieParser =require('cookie-parser');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const app = express();
const store = new MongoDBStore({uri:"mongodb://localhost:27017/connect_mongodb_session",collection:"Session"});
const bodyParser = require("body-parser");
const user = require('./routers/User');
const feedbackRoutes = require('./routers/feedbackRouter');

store.on('err',function(error){
    console.log(error);
})
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50* 1024 * 1024}
  }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public/'))
app.use(session({
    name:"sid",
    secret:"This is secret",
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly:true,
        secure:false,
    },
    store:store,
    resave:true,
    saveUninitialized:true,
}));
app.use(user);
app.use(feedbackRoutes);
const port = 3000;

mongoose.connect('mongodb://localhost:27017/ecommerceproject?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{useNewUrlParser: true,useUnifiedTopology: true})
.then(result => {
  console.log("Db is connected");
  console.log("server is running on port 3000")
}).catch(err => {
  console.log(err);
})
app.listen(port);
