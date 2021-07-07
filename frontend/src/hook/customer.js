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
async function editACustomer(data){
    const {username,phoneNumber,email,customers,newModal,store,message} = data
    console.log(username.value)
    const response =await axios.put(localhost+'/admin/customer/'+customers.value._id,
    {
        id:customers.value.users._id,
        email:email.value,
        phoneNumber:phoneNumber.value,
        username:username.value,
    }
    )
    console.log(response.data)
    if(response.data.length>0){
        store.dispatch('customer/updateAdminCustomer',{
            _id:customers.value._id,
            email:email.value,
            username:username.value,
            phoneNumber:phoneNumber.value,
        })
        newModal.value.hide()
    }else{
        if(response.data.err){
           message.value=response.data.err
            setTimeout(()=>message.value="",3000);
        }
    }
}   
async function changePage(){
    
}

export{
    editACustomer,
    getCustomers,
    changePage,
    getCustomerByPagination,
}    