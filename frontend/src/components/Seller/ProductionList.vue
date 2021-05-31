<template>
    <div class="card-table">
           <table class="table productTable">
               <caption></caption>
        <thead>
          <tr>
            <th scope="">ID</th>
            <th scope="">Product</th>
            <th scope="">Category</th>
            <th scope="">Quantity</th>
            <th scope="">Price</th>
            <th scope="">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item">
            <td class="productInfo">{{item._id}}</td>
            <td class="productInfo">{{item.name}}</td>
            <td class="productInfo">{{item.categories.name}}</td>
            <td class="productInfo">{{item.qty}}</td>
            <td class="productInfo">{{item.price}}</td>

            <td>
                <button class="btn btn-light" @click="editStatus(item)" 
                data-bs-toggle="modal" data-bs-target="#productModal">
                <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                </button>
                <button class="btn btn-light" @click="deleteStatus({
                  id:item._id,
                  name:item.name,
                })"
                 data-bs-toggle="modal" data-bs-target="#productModal">
                 <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                 </button>
            </td>
          </tr>
          
        </tbody>
      </table>
      <edit-delete-product :status="status" :dataset="datas" 
      :product="products"
      @onDelete-product="deleteProduct"
      @onUpdate-product="updateProduct"
      />
    </div>
</template>
<script>
import axios from 'axios'
import EditDeleteProduct from './EditDeleteProduct.vue'
export default {
  components: { EditDeleteProduct },
    title:'Product List',
    name:'ProductionList',  
    data(){
      return{
        products:[],
        status:"",
        datas:{},
      }
    }, 
    async mounted(){
      console.log(localStorage.getItem('userid'))
      const result = await axios.get('http://localhost:3000/getProduct/'+localStorage.getItem('userid'))
      console.log('got products',result.data)
      this.products = result.data
    },
    methods:{
      deleteStatus(data){
        this.status="delete";
        this.datas =data;
      },
      editStatus(data){
        this.status="edit";
        this.datas=data
      },
      deleteProduct(newProduct){
        this.products = newProduct;
      },
      updateProduct(newProduct){
        this.products=newProduct;
      }
    }
}
</script>
<style lang="scss" scoped>
 @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    .card-table{
        width: 98%;
        margin: auto;
        background: white;
        padding: 20px;
        box-shadow: $shadow_1;
        border-radius: 5px;

        .productTable {
        color: #d60265;
        border: 1px black;
        text-align: center;
        }
        .fa-pencil-square-o {
        color: #4691ff;
        }
        .fa-trash {
        color: red;
        }
        .productInfo {
        color: black;
        }
    }

</style>    