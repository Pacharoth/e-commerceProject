<template>
    <tbody>
     <tr>
        <th scope=""> {{users.username}}</th>
        <td>{{phoneNumber}}</td>
        <td>{{users.email}}</td>
        <td>{{registerAt}}</td>
        <td><span data-placement="top" data-toggle="tooltip" title="Edit">
                <button class="btn text-primary btn-xs" 
                @click="editModal(customer)" data-title="Edit" data-bs-toggle="modal" data-bs-target="#customerModal" >
                    <em class="fas fa-edit"></em>
                </button>
            </span>
            <span data-placement="top" data-toggle="tooltip" title="Delete">
                <button class="btn text-danger btn-xs" 
                @click="deleteModal(customer)" data-title="Delete" data-bs-toggle="modal" data-bs-target="#customerModal">
                    <em class="fas fa-trash-alt"></em>
                </button>
            </span>
        </td>
    </tr>
  </tbody>
    
</template>
<script>
import { ref, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex';
import { computed, onMounted } from '@vue/runtime-core';
import {Modal} from 'bootstrap';
export default {
  name:'AdminCustomers',
  props:["customer"],
  components:{
  },
  setup(props) {
    const store = useStore();
    const {customer}=toRefs(props);
    var {phoneNumber,users}=customer.value
    const registerAt2 =new Date(users.registerAt)
    const registerAt = registerAt2.toLocaleDateString()
    const modal =ref(null)
    const count =ref(0);
    const modelvalue =ref({});
    onMounted(()=>{
        modal.value= new Modal(modal.value)
    })
    if(phoneNumber==null) phoneNumber="null"
    const customerModal = computed(()=>store.getters['customer/getModal'])
    const deleteModal = (data)=>{
        modelvalue.value=data;
        store.dispatch('customer/setAdminCustomer',modelvalue.value._id)
        store.dispatch('customer/changeToModal',"delete");
    }
    const editModal = (data)=>{
        modelvalue.value=data,
        store.dispatch('customer/setAdminCustomer',modelvalue.value._id);
        store.dispatch('customer/changeToModal',"edit");
    }
    
    return {
        phoneNumber,
        users,
        registerAt,
        deleteModal,
        editModal,
        customerModal,
        count,
        modelvalue,
    }
  }
}
</script>
<style lang="scss" scope>
    table{
    width:100%;
    text-align: center;
    
    }
    #example_filter{
        float:right;
    }
    #example_paginate{
        float:right;
    }
    label {
        display: inline-flex;
        margin-bottom: .5rem;
        margin-top: .5rem;
      
    }
</style>