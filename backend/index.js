const express =require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser =require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const user = require('./routers/User');
const feedbackRoutes = require('./routers/feedbackRouter');
const server=require('http').createServer(app);
const io = require('socket.io')(server,{
  cors:{
    origin:[
      "http://localhost:8080",
      "http://localhost:3001"
    ],
    methods:['GET','POST','PUT','DELETE'],
  }
});
app.use(cors({
  allowedHeaders:[
    "*"
  ],
  origin:[
    'http://localhost:8080',
    'note.awesomeshop.com',
    'https://3fb14ebaa81959.localhost.run',
    'http://localhost:3001',
    
  ],
  credentials:true,
  exposedHeaders:['set-cookie']
}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:__dirname+"public",
    limits: { fileSize: 50* 1024 * 1024}
  }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(session({
    
    name:"sid",
    secret:"This is secret",
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly:true,
        secure:false,
        domain:"http://localhost:3001"
    },
    resave: true,
    saveUninitialized: true
}));
const port = 3000;
exports.portlisten=port;
app.use(user);
app.use(feedbackRoutes);
mongoose.connect('mongodb://localhost:27017/AmazingShop?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{useNewUrlParser: true,useUnifiedTopology: true})
.then(result => {
  console.log("Db is connected");
  console.log("server is running on port 3000")
}).catch(err => {
  console.log(err);
})
io.on('connection',(socket)=>{
  chat.chatData(io,socket);
});

server.listen(port);
