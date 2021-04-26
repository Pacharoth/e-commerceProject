<template>
    <tbody>
     <tr>
        <td>1</td>
        <th scope=""> {{customer.name}}</th>
        <td>{{customer.phone}}</td>
        <td>{{customer.email}}</td>
        <td>{{customer.register}}</td>
        <td><span data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn text-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><em class="fas fa-edit"></em></button></span>
            <span data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn text-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><em class="fas fa-trash-alt"></em></button></span>
        </td>
    </tr>
  </tbody>
    
</template>
<script>
export default {
  name:'AdminCustomers',
  props:["customer"]
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