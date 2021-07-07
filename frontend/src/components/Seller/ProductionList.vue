<template>
    <div class="card-table">
           <table class="table productTable">
               <caption></caption>
        <thead>
          <tr>
            <th scope="">ID</th>
            <th>Product</th>
            <th scope="">Product's Name</th>
            <th scope="">Category</th>
            <th scope="">Quantity</th>
            <th scope="">SellPrice</th>
            <th scope="">BuyPrice</th>
            <th scope="">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products.length" :key="item">
            <td class="productInfo">{{item}}</td>
            <td class="productInfo"><img :src="localhost+products[item-1].img" width="50" height="50" alt="" class="improduct"></td>
            <td class="productInfo">{{products[item-1].name}}</td>
            <td class="productInfo">{{products[item-1].categories.name}}</td>
            <td class="productInfo">{{products[item-1].qty}}</td>
            <td class="productInfo">${{products[item-1].price}}</td>
            <td class="productInfo">${{products[item-1].buyPrice}}</td>
            <td>
                <button class="btn btn-light" @click="editStatus(products[item-1])" 
                data-bs-toggle="modal" data-bs-target="#productModal">
                <i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>
                </button>
                <button class="btn btn-light" @click="deleteStatus({
                  id:products[item-1]._id,
                  name:products[item-1].name,
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
import { localhost } from '../../utils/FormValidation'
export default {
  components: { EditDeleteProduct },
    title:'Product List',
    name:'ProductionList',  
    data(){
      return{
        products:[],
        status:"",
        datas:{},
        localhost:localhost,
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
    td{
      vertical-align: middle;
    }

</style>    