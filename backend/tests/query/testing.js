const mongoose = require('mongoose');
const chat =require('../../models/chatModel');
const customer = require('../../models/customerModel');
const room = require('../../models/RoomChat');
const user = require('../../models/userModel')
mongoose.connect('mongodb+srv://naruto:narutonaraku01@P@cluster0.o3uwi.mongodb.net/e-commerceproject?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true})
.then(result => {
  console.log("Db is connected");
}).catch(err => {
  console.log(err);
})
async function getUser(){
    var response=await customer.find().populate(
      {
        path:'users',
        match:{
          username:{
            $eq:'madara'
          }
        },
        options:{
          retainNullValues: true,
        }
      }
    )
    response=response.filter(result=>{
      if(result.users!==null){
        return result;
      }
    })
    console.log(response)
    const data =await room.find().populate('users')
    if(data.length<=0){
      console.log("hello")
    }
}
getUser();