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
                <form method="POST" action="" ref="form" enctype="multipart/form-data">
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="productname">Product name</label>
                      <input type="text"  class="form-control" id="productName" name="productName" placeholder="Product name">
                    </div>
                    <div class="form-group">
                      <label for="price">Price per unit</label>
                      <input type="number" step="any" class="form-control" id="price" name="price" placeholder="Price per unit">             
                    </div>

                    <div class="form-group">
                      <label for="qty">Quantity</label>
                      <input type="number"  class="form-control" id="qty" placeholder="Quantity" name="qty">
                    </div>

                    <div class="form-group">
                      <label for="detail">Detail</label>
                      <input type="text" class="form-control" id="detail" placeholder="Product detail" name="detail">
                    </div>
                    <div class="form-group">
                      <label for="instock">Instock Date</label>
                      <input type="date" class="form-control" id="instock" placeholder="Instock Date" name="instock">
                    </div>
                    <label for="Category">Category</label>
                    <select class="form-select" aria-label="Default select example" id="category" name="category">
                      <option selected value="electronic">Electronics</option>
                      <option value="bag">Bags</option>
                      <option value="wallet">Wallets</option>
                      <option value="clothes">Clothes</option>
                    </select>
                    <label for="productImg" class="form-label">Product's image</label>
                    <input class="form-control" type="file" id="productImg" name="img" />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="modal.hide()" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn opt">Add Product</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <button type="button" class="btn opt">Generate Report</button>
        

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
          <tr>
            <th scope="row">1</th>
            <td>
              <h5>CustomerName</h5>
              <p  class="proDescrib" >name@gmail.com</p>
              <p  class="proDescrib" >+855 12334455</p>

            </td>
            <td style="width: 30%;">
              <div class="row">
                <div class="col-md-4" style="text-align: center;">
                  <img class="proImg" src="../../assets/img/menBlueShirt.jpg" alt=""/>
                </div>
                <div class="col-md-5">
                  <p class="proDescrib">ProductName</p>
                  <p class="proDescrib">productSize</p>
                  <p class="proDescrib">productPrice</p>
                </div>
              </div>
            </td>

            <td>
              <span class="proDescrib">Pending</span> <i class="fa fa-check" aria-hidden="true"></i>
            </td>
          </tr>
          
        </tbody>
      </table>
      </div>
    </div>
</template>
<script>
import {Modal} from 'bootstrap';
import CardDashboard from '../Admin/CardDashboard'
import { ref } from '@vue/reactivity';
import axios from 'axios';

export default {
    title:'Seller',
    name:"MainSeller",
    setup(){
      const form =ref(null)
      
      async function createProduct(){
        const newForm = new FormData(form.value);
        await axios.post("http://localhost:3000/product",newForm);        
      }

      return{
        form,
        createProduct
      }
    },
    data(){
        return {
            modal:null,
        }
    },
    components:{
        CardDashboard
    },
    mounted(){
        this.modal=new Modal(this.$refs.modal);
    },
    
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
            padding: 4  % 2% 2% 2%;
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
    .proImg {
    width: 150px;
    }

    .customer {
    font-weight: 900;
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