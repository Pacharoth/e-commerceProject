<template>
  <tbody>
    <tr>
      <td><input type="checkbox" name=""></td>
      <th>{{postItem.name}}</th>
      <td>{{postItem.phone}}</td>
      <td>{{postItem.email}}</td>
      <td>{{postItem.register}}</td>
      <td>{{postItem.address}}</td>
      <td><span data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn text-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><i class="far fa-edit"></i></button></span>
        <span data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn text-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><i class="far fa-trash-alt"></i></button></span>
      </td>
      
    </tr>
  </tbody>
    
</template>

<script>
export default {
  name: 'Post',
  props: ["postItem"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
  table{
    width:100%;
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
