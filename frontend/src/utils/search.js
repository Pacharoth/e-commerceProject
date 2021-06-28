import axios from 'axios';
import {localhost} from '../utils/FormValidation';
async function searchProduct(data){
    const {route,store,value}=data;
    route.push({name:'customerlistproduct',query:{q:value}});
    const response=await axios.get(localhost+"/search/product?q="+value);
    console.log(response.data)
    store.dispatch('customer/searchProduct',response.data);
}
export{searchProduct};