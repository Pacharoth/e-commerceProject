<template>
    <tbody>
     <tr>
        <td><input type="checkbox" name=""></td>
        <th scope=""> {{postItem.name}}</th>
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
<style lang="scss">
    
</style>