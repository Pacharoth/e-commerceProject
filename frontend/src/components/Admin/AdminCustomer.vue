<template>
      <div class="container">
    <h2 class="text-secondary "><strong>Customer</strong></h2>
    <div class="row">
      <table id="example" class="table table-striped" style="width:100%">
        <caption></caption>
        <thead class="bg-primary text-light">
            <th scope="">id</th>
            <th scope="">Name</th>
            <th scope="">Phone</th>
            <th scope="">Email</th>
            <th scope="">Register Date</th>
            <th scope="">Action</th>
        </thead>
        <admin-customers v-for="customer in customerList" :key="customer" :customer="customer"/>
    </table>
      <nav aria-label="..." >
        <ul class="pagination">
          <li v-if="page>2" class="page-item disabled">
            <span class="page-link">Previous</span>
          </li>
          <li class="page-item" v-for="pages in page" :key="pages"><a class="page-link" href="#">{{pages}}</a></li>
          <li class="page-item" v-if="page>2">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
    
  </div>
</template>
<script>
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import AdminCustomers from './AdminCustomers';
import {getCustomers} from '../../hook/customer'
export default {
  title:'Customer',
  name:'AdminCustomer',
  components:{
    AdminCustomers,
  },
  setup(props) {
    console.log(props)
    const store = useStore();
    onMounted(async()=>{
      getCustomers(store);
    })
    const page =computed(()=>store.getters['customer/getPage'])
    return{
      page,
      customerList:computed(()=>store.getters['customer/getAdminCustomers']) 
    }
  },
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css';

    .container{
      margin-top:7% ;
      padding: 2%;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: white;
      box-shadow: $shadow_1;
      border-radius: 5px;
      @include breakpoint-down(small){
        margin-top: 12% ;
        width: 100%;
        height: 100%;
      }
    }
</style>