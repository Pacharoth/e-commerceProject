import axios from "axios"
import store from "../stores/store"
import { localhost } from "../utils/FormValidation"

async function getCustomers(store){
    try{
        const response =await axios.get(localhost+'/admin/customer?page=1&limit=5')
        store.dispatch('customer/loadCustomerToList',{
            data:response.data.results,
            page:(response.data.next===undefined)?null:response.data.next.page,
        })
    }catch(err){
        store.dispatch('customer/loadCustomerToList',[])
    }
}
async function getCustomerByPagination(data){
    try{
        const {store} = data;
        const response=await axios.get(localhost+"/admin/customer?page="+data.page+"&limit=5");
        const alldata = {}
        console.log(response.data)
        if(response.data.next){
            alldata.page = response.data.next.page;
        }else{
            alldata.page = response.data.previous.page;
        }
        alldata.data =response.data.results;
        store.dispatch("customer/loadCustomerToList",alldata);
    }catch(err){
        store.dispatch("customer/loadCustomerToList",[])
    }

}
async function editACustomer(){
    
}
async function changePage(){
    
}

export{
    editACustomer,
    getCustomers,
    changePage,
    getCustomerByPagination,
}