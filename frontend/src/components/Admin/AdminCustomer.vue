<template>
  <Suspense>
     <template #default>
      <div class="container">
    <h2 class="text-secondary "><strong>Customer</strong></h2>
    <div class="row">
      <table id="example" class="table table-striped" style="width:100%">
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
          <!-- <li v-if="page>=2" class="page-item disabled">
            <span class="page-link">Previous</span>
          </li> -->
          <li class="page-item" v-for="pages in page" :key="pages"><button class="page-link" @click="paginaton(pages)">{{pages}}</button></li>
          <!-- <li class="page-item" v-if="page>2">
            <a class="page-link" href="#">Next</a>
          </li> -->
        </ul>
      </nav>
    </div>
    
  </div>
  </template>
    <template #fallback>
            <div>Loading</div>  
    </template>
  </Suspense>
</template>
<script>
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import AdminCustomers from './AdminCustomers';
import {getCustomerByPagination, getCustomers} from '../../hook/customer'
export default {
  title:'Customer',
  name:'AdminCustomer',
  components:{
    AdminCustomers,
  },
  setup() {
    const store = useStore();
    onMounted(async()=>{
      await getCustomers(store);
    })
    //computed
    const page =computed(()=>store.getters['customer/getPage'])
    //method
    async function paginaton(pages){
      await getCustomerByPagination({page:pages,store});
      }
    return{
      page,
      customerList:computed(()=>store.getters['customer/getAdminCustomers']) ,
      paginaton
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
      padding-bottom: 1%;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: white;
      box-shadow: $shadow_1;
      border-radius: 5px;
      overflow: auto;
      &::-webkit-scrollbar{
      width: 2px;
        &:hover{
            background-color:rgb(250, 241, 241) ;
        }
      }
      &::-webkit-scrollbar-thumb{
          &:hover{
          background-color: rgb(212, 209, 209);
          height: 20px;
          border-radius: 50px;
        }
      }
    
      &::-webkit-resizer{
          height: 20%;
      }
      @include breakpoint-down(medium){
        margin-top: 9%;
        width: 80%;
      }
      @include breakpoint-down(small){
        margin-top: 15% ;
        width: 98%;
      }
    }
</style>