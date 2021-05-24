<template>
    <div class="modal fade" ref="modal" id="customerModal" tabindex="-1" aria-labelledby="customerModalLabel" aria-hidden="true">
      <div class="modal-dialog background">
        <div class="modal-content" v-if="namemodal=='delete'">
          <div class="modal-header">
            <h5 class=" modal-title text-centered text-danger" id="customerModalLabel">Delete User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form action="">
            <div class="modal-body">
              <h5>Are you sure you want to delete user:{{ customers.users.username }}?</h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" @click="deleteUser" data-bs-dismiss="modal">Delete</button>
            </div>
          </form>
        </div>
        <div class="modal-content" v-if="namemodal=='edit'">
          <div class="modal-header">
            <h5 class=" modal-title text-centered text-primary" id="customerModalLabel">Edit Customer</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form action="">
            <div class="modal-body">
                  <div class="form-group">
                      <label for="Company " class="text-secondary">Username:</label>
                      <input type="text" v-model="customers.users.username" class="input">
                  </div>
                  <div class="form-group">
                      <label for="Company " class="text-secondary">Email:</label>
                      <input type="email" v-model="customers.users.email" class="input">
                  </div>
                  <div class="form-group">
                      <label for="Company " class="text-secondary">Phone Number:</label>
                      <input type="text" v-model="customers.phoneNumber" class="input">
                  </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="editUser">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
<script>
import { computed, onMounted, ref, watchEffect } from '@vue/runtime-core'
import { useStore } from 'vuex'
import axios from 'axios'
import {Modal} from 'bootstrap';
import { localhost } from '../../utils/FormValidation'
export default {
    props:["namemodal","customer"],
    setup() {
      var modal = ref(null)
      const store = useStore()
      const customers = computed(()=>store.getters['customer/getAnAdminCustomer']) 
      const newModal = ref(null)
      onMounted(()=>{ 
         newModal.value= new Modal(modal.value)
      })
      watchEffect(()=>{
        console.log(customers.value)
      })
      const deleteUser =async()=>{
        await axios.delete(localhost+'/admin/customer/'+customers.value._id,{id:customers.value.users._id})
        store.dispatch('customer/deleteUser',customers.value._id);
      }
      const editUser = async()=>{
        
      }
      return {
        modal,
        customers,
        deleteUser,
        editUser,
      }
    }
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .input{
      background: #eee;
    }
</style>