import axios from 'axios';
import { localhost } from '../utils/FormValidation';
const sellerRegister=async(data)=>{
    const {email,company,contact,address,err,color} =data;
    const response=await axios.post(localhost+"/admin/seller",{
        email:email.value,
        company:company.value,
        contact:contact.value,
        address:address.value,
    });
    if(response.data.length>0){
        color.value = true;
        err.value="Register Company "+company.value+" has been succeed";

    }else{
        if(response.data.result){
            color.value=false
            err.value=response.data.result;   
        }
    }
    setTimeout(()=>{
        err.value="";
    },3000);
}
const getSellers = async(store)=>{
    const response = await axios.get(localhost+"/admin/seller?page=1&limit=10");
    console.log(response);
    store.dispatch('seller/loadSeller',response.data);
}
export{
    sellerRegister,
    getSellers,
}