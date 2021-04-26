const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path")
const app = express();

const feedbackRoutes = require('./routers/feedbackRouter');

const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(feedbackRoutes);

mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false')
.then(result => {
  console.log("Db is connected");
  console.log("server is running on port 3000")
  app.listen(port);
}).catch(err => {
  console.log(err);
})