<template>
    <div class="seller-dashpage">
        <card-dashboard title="Seller"/>
        <div class="option">

          <router-link to="/seller/productlist" class="btn opt me-2" role="button">List Product</router-link>
        
          <button type="button" class="btn opt me-2" @click="modal.show()" data-toggle="modal" data-target="#example">Add Product</button>
        
           <!-- Modal -->
          <div class="modal fade" id="example" tabindex="-1" ref="modal" role="dialog" aria-labelledby="exampleLabel" aria-hidden="false">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title header" id="exampleModalLabel">Add Product</h5>
                  <button type="button" class="close" @click="modal.hide()" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form ref="form" @submit.prevent="createProduct()" enctype="multipart/form-data">
                  <div class="modal-body">
                    <div v-if="log != ''" class="alert alert-success" role="alert">
                      {{log}}
                    </div>
                    <div class="form-group">
                      <label for="productname">Product name</label>
                      <input v-model="product.name" type="text" class="form-control" id="productName" name="productName" placeholder="Product name">
                    </div>
                    <div class="form-group">
                      <label for="price">Buy Price per unit</label>
                      <input v-model="product.buyPrice" type="number" step="any" min="0" class="form-control" id="price" name="price" placeholder="Buy Price per unit">             
                    </div>
                    <div class="form-group">
                      <label for="price">Price per unit</label>
                      <input v-model="product.price" type="number" step="any" min="0" class="form-control" id="price" name="price" placeholder="Price per unit">             
                    </div>

                    <div class="form-group">
                      <label for="qty">Quantity</label>
                      <input v-model="product.qty" type="number" min="0"  class="form-control" id="qty" placeholder="Quantity" name="qty">
                    </div>

                    <div class="form-group">
                      <label for="detail">Detail</label>
                      <input v-model="product.detail" type="text" class="form-control" id="detail" placeholder="Product detail" name="detail">
                    </div>
                    <div class="form-group">
                      <label for="instock">Instock Date</label>
                      <input v-model="product.instock" type="date" class="form-control" id="instock" placeholder="Instock Date" name="instock">
                    </div>
                    <label for="Category">Category</label>
                    <select v-model="product.category" class="form-select" aria-label="Default select example" id="category" name="category">
                      <option  v-for="item in categories" :key = item.id :value="item.name">{{item.name}}</option>
                    </select>
                    <label for="productImg" class="form-label">Product's image</label>
                    <input ref="img" class="form-control" type="file" id="productImg" name="img" />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="modal.hide()" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn opt">Add Product</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <router-link to="/seller/report" class="btn opt">Generate Report</router-link>
        

      </div>
    
      <div class="productpage">
          <table class="table productTable">
          <caption></caption>
        <thead>
          <tr>
            <th scope="col-md-2">ID</th>
            <th scope="col-md-3">Customer</th>
            <th scope="col-md-5">Product</th>
            <th scope="col-md-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in order.length" :key="i">
            <th scope="row">{{i}}</th>
            <td>
              <h5>{{order[i-1].users.username}}</h5>
              <p  class="proDescrib" >{{order[i-1].users.email}}</p>
              <p  class="proDescrib" >{{phoneNumber[i-1]}}</p>

            </td>
            <td  style="width: 30%;" v-if="order[i-1].product" >
              <div v-for="product in order[i-1].product" :key="product" class="data">
                <!-- <div class="col-md-4 m-2" style="text-align: center;"> -->
                <slot v-if="product!==null">
                <img class="proImg" :src="'http://localhost:3000'+product.products.img" alt=""/>
                <!-- </div> -->
                <!-- <div class="col-md-5"> -->
                  <span>
                    <p class="proDescrib p" >Name: {{product.products.name}}</p>
                    <p class="proDescrib p" >Quantity: {{product.quantity}}</p>
                    <p class="proDescrib p" >Price: ${{product.products.price}}</p>
                  </span>
                </slot>
                  
                <!-- </div> -->
              </div>
            </td>

            <td>
              <span class="proDescrib">{{order[i-1].status}}</span> <i class="fa fa-check" aria-hidden="true"></i>
            </td>
          </tr>
          
        </tbody>

      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <slot v-if="page.next">
            <li class="page-item" v-for="pages in page.next.page" :key="pages"><button class="page-link" @click="paginationOrder(pages)">{{pages}}</button></li>
          </slot>
          <slot v-if="page.previous">
            <li class="page-item" v-for="pages in page.previous.page" :key="pages"><button class="page-link"  @click="paginationOrder(pages)">{{pages}}</button></li>
          </slot>
        </ul>
      </nav>
      </div>
    </div>
</template>
<script>
import {Modal} from 'bootstrap';
import CardDashboard from '../Admin/CardDashboard'
import axios from 'axios';
import { localhost } from '../../utils/FormValidation';

export default {
    title:'Seller',
    name:"MainSeller",
    data(){
        return {
            modal:null,
            categories:[{}],
            product:{},
            form:null,
            log:'',
            order:[],
            id:[],
            phoneNumber:[],
            page:{},
            
        }
    },
    components:{
        CardDashboard
    },
    computed:{
      user(){
        return this.$store.getters['auth/getSession']
      }
    },
    async mounted(){
        this.modal=new Modal(this.$refs.modal);
         const categories = await axios.get("http://localhost:3000/category")
         this.categories = categories.data
         this.form =new Modal(this.$refs.modal);
         var {data} = await axios.get(localhost+'/order/'+this.user.userid+"?page=1&limit=3");
         this.order=data.customerOrder;
         console.log(data)
        for (const key in this.order) {
          this.id.push(this.order[key].users._id)
        }
        this.page=data.results;
        var response=await axios.post(localhost+"/verifyuser",this.id);
        this.phoneNumber=response.data;
    },
    methods:{
        async paginationOrder(number){
          var {data}=await axios.get(localhost+"/order/"+this.user.userid+"?page="+number+"&limit=3");
          this.order=data.customerOrder;
          this.page=data.results
        },
        async createProduct(){
          const dataform = new FormData(this.$refs.form)
          console.log("product created ", this.product)
          // console.log("form data",dataform)
          dataform.get("img")
          
          const form = new FormData()
          form.append("file",dataform.get("img"))
          form.append("productname",this.product.name);
          form.append("buyPrice",this.product.buyPrice);
          form.append("price",this.product.price);
          form.append("instock",this.product.instock);
          form.append("qty",this.product.qty);
          form.append("detail",this.product.detail);
          form.append("category",this.product.category);
          form.append("sellerid", localStorage.getItem('userid'))
          const response=await axios.post('http://localhost:3000/postProduct', form)
          this.log = response.data.message
          if(response.data.message){
            this.form.hide();
          }          
      }
    }
    
}
</script>
<style lang="scss">
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    .seller-dashpage{
        padding-left: 2% ;
        padding-right:2% ;
        .productpage{
            box-shadow: $shadow_1;
            border-radius: 5px;
            padding:2%;
            background: white;
        }
    }
    .dropdown-toggle::after {
    content: none;
    }
    .dropdown-header {
    color: #d60265;
    font-size: 20px;
    font-weight: 900;
    }
    .productTable {
    color: #d60265;
    border: 1px black;
    text-align: center;
    }
    .proDescrib {
      color: black;
    }
     .p{
        text-align: left;
      }
    .proImg {
      width: 100px;
      margin-right: 5%;
    }

    .customer {
    font-weight: 900;
    }
    .data{
      display: flex;
      width: 100%;
      align-items: center;
      margin-bottom: 2%;
    }
    .option {
    /* display: flex;
    flex-direction: row;
    justify-content: flex-end; */
    float: right;
    }
    /* .form-control::placeholder{
    color: #d60265;
    } */
        .header {
    color: #d60265;
    }
    .nav-link:active {
    background-color: #f165a7;
    }
    .nav-link:focus {
    background-color: #f165a7;
    }
    .form-control {
    border: 1px solid #d60265;
    }
    .search {
    font-family: Arial, FontAwesome;
    }
    .search::placeholder {
    color: #d60265;
    }
    .dropdown-toggle::after {
    content: none;
    }
    .dropdown-header {
    color: #d60265;
    font-size: 20px;
    font-weight: 900;
    }
    .btn.opt {
    background-color: #d60265;
    color: white;
    }
    .profile{
    left: 0;
    }
    .customerOrder {
    left: auto;
    right: 0;
    width: 650px;
    }
    .productOrdered {
    color: black;
    }
</style>