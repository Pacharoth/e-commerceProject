const express =require('express'),
mongoose = require('mongoose'),
session = require('express-session'),
cookieParser =require('cookie-parser'),
fileUpload = require('express-fileupload'),
cors = require('cors'),
app = express(),
bodyParser = require("body-parser"),
user = require('./routers/User'),
feedbackRoutes = require('./routers/feedbackRouter'),
categoryRoutes =require('./routers/category'),
customerRoutes = require('./routers/customer'),
sellerRoutes = require('./routers/seller'),
chatRoutes = require('./routers/chat'),
customerHomeRoute = require('./routers/customerHome'),
server=require('http').createServer(app),
{chatData,chatList}= require('./sockets/chat'),

roleRoutes = require('./routers/role'),
productRouter = require('./routers/product'),
io = require('socket.io')(server,{
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
port = 3000;
exports.portlisten=port;
app.use(customerHomeRoute)
app.use(user);
app.use(feedbackRoutes);
app.use(categoryRoutes);
app.use(customerRoutes);
app.use(sellerRoutes);
app.use(chatRoutes)
app.use(roleRoutes)
app.use(productRouter)
mongoose.connect('mongodb://localhost:27017/e-commerceProject?readPreference=primary&appname=MongoDB%20Compass&ssl=false',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false,
})
.then(result => {
  console.log("Db is connected");
  console.log("server is running on port 3000")
}).catch(err => {
  console.log(err);
})
io.on('connection',(socket)=>{
  chatData(io,socket);
  chatList(io,socket)
});

server.listen(port);
