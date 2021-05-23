import axios from "axios"
import { localhost } from "../utils/FormValidation"

async function getCustomers(store){
    await axios.get(localhost+"/admin/customer?page=1&limit=5").then(
        result=>{
            const data = result.data;
            const alldata = {}
            alldata.page=data.next.page;
            alldata.data =result.data.results
            store.dispatch("customer/loadCustomerToList",alldata);
        }
    ).catch(()=>{
        store.dispatch("customer/loadCustomerToList",{});
    })
}
async function getCustomerByPagination(data){
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