import axios from "axios"
import { localhost } from "../utils/FormValidation"

async function getCustomers(store){
    await axios.get(localhost+"/admin/customer?page=1&limit=2").then(
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

async function editACustomer(){

}
async function changePage(){
    
}

export{
    editACustomer,
    getCustomers,
    changePage,
}