<template>
    <div class="modal fade" id="productModal" ref="modals" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" v-if="status=='edit'">
                <form ref="form" enctype="multipart/form-data" @submit.prevent=" updateDataFromList(dataSet,newDate)">
                
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">Edit Product</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Product Name</label>
                                <input type="text" v-model="dataSet.name" class="form-control" name="name" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Product Detail</label>
                                <input type="text" v-model="dataSet.detail" class="form-control" name="detail" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Quantity</label>
                                <input type="number" min="0" v-model="dataSet.qty" class="form-control" name="qty" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Price</label>
                                <input type="number" min="0" v-model="dataSet.price" name="price" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Default Price</label>
                                <input type="number" min="0" v-model="dataSet.buyPrice" name="buyPrice" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">discount</label>
                                <input type="number" min="0" v-model="dataSet.discount" name="discount" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                                <label for="instock">Instock Date</label>
                                <input  type="date" class="form-control" v-model="newDate" id="instock" placeholder="Instock Date" name="instock">
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Category</label>
                                <select class="form-select" aria-label="Default select example" id="category" name="category">
                                    <option  v-for="item in category" :key = "item.id" :value="item.name">{{item.name}}</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <a :href="'http://localhost:3000'+dataSet.img[0]">Image</a>
                            </div>
                            <label for="productImg" class="form-label">Product's image</label>
                            <input ref="img" class="form-control" type="file" id="productImg" name="img"/>
                  
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save Change</button>
                    </div>
                </form>
            </div>
            <div class="modal-content" v-else-if="status=='delete'">
                <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">Delete Product</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                    Product id : {{dataset.id}}
                    </div>
                    <div class="mb-3">
                    Product Name : {{dataset.name}}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" @click="deleteDataFromList(dataset.id)" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Modal} from 'bootstrap';
import axios from 'axios';
import { localhost } from '../../utils/FormValidation';
export default {
    name:"EditDelete",
    props:["status","dataset","product"],
    data() {
        return {
            modal:null,
            products:[],
            category:[],
            datas:{},
        }
    },
    computed:{
        dataSet(){
            console.log(this.dataset);
            return this.dataset;
        },
        newDate(){
            const register = new Date(this.dataSet.instock)
            var month = String(register.getMonth()+1);
            if(month.length<2){
                month = '0'+month
            }
            console.log(month)
            const newregister = register.getFullYear()+"-"+month+"-"+register.getDate();
            return newregister;
        }
    },
    updated() {
        this.datas =this.dataset
        
    },
    async mounted() {
        this.modal = new Modal(this.$refs.modals);
        this.products =this.product
        this.category = (await axios.get(localhost+'/category')).data
    },

    emits:['onDelete-product','onUpdate-product'],
    methods: {
       async  deleteDataFromList(id){
            const response = await axios.delete(localhost+'/product/'+id);
            if(response.data.delete){
                this.products = this.product.filter(element=>element._id!==id);
                this.$emit("onDelete-product",this.products);
                this.modal.hide();
            }else{
                alert("Cannot Delete the Product");
            }
            
        },
        async updateDataFromList(data,newDate){
            console.log(newDate)
            const form = new FormData(this.$refs.form);
            const response = await axios.put(localhost+"/product/"+data._id,form);
            console.log(response.data);
            if(response.data.save){
                this.products= this.product.filter(element=>{
                if(element._id===data._id){
                    element.name=data.name
                    element.category = data.category
                    element.buyPrice = data.buyPrice
                    element.qty  =data.qty;
                    element.price =data.price
                    if(form.get('img').name){
                        element.img[0]='/assets/img/'+form.get('img').name
                    }
                    element.instock = newDate;
                }
                return element;
                });
                this.$emit("onUpdate-product",this.products);
                alert("Product has been updated")
                this.modal.hide();
            }else{
                alert("Cannot Save the product");
            }
        }
    },
}
</script>
<style lang="scss" scoped>

</style>