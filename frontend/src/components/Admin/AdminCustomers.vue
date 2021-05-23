<template>
    <tbody>
     <tr>
        <td>1</td>
        <th scope=""> {{users.username}}</th>
        <td>{{phoneNumber}}</td>
        <td>{{users.email}}</td>
        <td>{{registerAt}}</td>
        <td><span data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn text-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#customerModal" ><em class="fas fa-edit"></em></button></span>
            <span data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn text-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#customerModal" ><em class="fas fa-trash-alt"></em></button></span>
        </td>
    </tr>
  </tbody>
    
</template>
<script>
import { toRefs } from '@vue/reactivity'
export default {
  name:'AdminCustomers',
  props:["customer"],
  setup(props) {
      const {customer}=toRefs(props);
      const {phoneNumber,users}=customer.value
      const registerAt2 =new Date(users.registerAt)

      const registerAt = registerAt2.toLocaleDateString()

      return {
          phoneNumber,
          users,
          registerAt,
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