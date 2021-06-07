<template>
    <div class="category-modal" :class="display" @click="redirectAdmin" ref="model">
        <div class="category-content">
            <div class="search">
                <form v-if="status=='search'" @submit.prevent="searchCategoriesV">
                    <input type="text" class=" search-category" @change="searchCategoriesV" placeholder="&#xf002; Search Categories" v-model="name" style="font-family: Arial, 'Font Awesome 5 Free'">
                </form>
                <form v-if="status=='add'" @submit.prevent="addCategory">               
                    <input type="text"  class="search-category" placeholder="&#xf022; Add Categories" v-model="name" style="font-family: Arial, 'Font Awesome 5 Free'">
                </form>
                <form v-if="status=='update'" @submit.prevent="updateCategory(id)">
                    <input type="text"  class="search-category" placeholder="&#xf022; Update Category" v-model="name" style="font-family: Arial, 'Font Awesome 5 Free'">
                </form>
            </div>
            <button class="category-add" v-if="status=='search'||status=='update'" @click="changeStatus()"><em class="fas fa-plus"></em></button>
            <button class="category-add" v-if="status=='add'" @click="changeStatus()"><em class="fas fa-search"></em></button>
            <div class="err-content" v-if="err!==''">
                <h5 class="error">{{err}}</h5>
            </div>
            <div class="category-list">
                <div v-for="acategory in category" :key="acategory._id" class="category" @click="getCategory(acategory._id)">
                   <h4>{{acategory.name}}</h4> <button class="delete" @click="deleteCategory(acategory._id)"><em class="fas fa-times" ></em></button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../../routers/route'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import {searchCategories,addACategory,updateACategory,getACategory,deleteACategory} from'../../hook/category'
let localhost= 'http://localhost:3000'
export default {
    name:'AdminCategory',
    setup() {
        const model = ref(null)
        const display = ref('none');
        const status = ref('search');
        const category = ref([]);
        const name = ref("");
        const err = ref("");
        const id = ref("");
        onMounted(()=>{
            display.value="block";
            const getCategory=async()=>{
                try {
                    const response=await axios.get(localhost+'/category')
                    category.value = response.data;
                } catch (error) {
                    console.log(error);
                }
            }
            getCategory();
        })
        
        //method
        function redirectAdmin(event){
            if(event.target ==model.value){
                status.value ='search'
                router.push({name:'Admin'})
            }
        }
        function changeStatus(){
            if(status.value=='add'){
                status.value='search';
            }else{
                status.value='add'
            }
        }
        async function deleteCategory(ids){await deleteACategory(ids,category,err);}
        function getCategory(ids){getACategory(ids,category,id,status,name);}
        async function updateCategory(ids){await updateACategory(ids,name,category,id,status,err);}
        async function addCategory(){await addACategory(name,category,err)}
        async function searchCategoriesV(){
            await searchCategories(name,category,err)
        }
        return{
            //data
            err,
            category,
            status,
            name,
            display,
            model,
            id,
            //method
            redirectAdmin,
            updateCategory,
            changeStatus,
            deleteCategory,
            getCategory,
            addCategory,
            searchCategoriesV,
        }
    },
}
</script>
<style lang="scss" scoped>
    @import '../../../node_modules/bootstrap/scss/bootstrap.scss';
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    .grey{
        color: rgb(92, 91, 91);
    }
    .white{
        color: white;
    }
    

    .none{
        display: none;
    }
    .block{
        display: block;
    }
    .category-modal {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        padding-top: 2%; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.493); /* Black w/ opacity */
        
        .category-content {
            background-color: #e5e2e2;
            margin: auto;
            display: flex;
            width: 50%;
            height: 90%;
            flex-direction: column;
            padding: 20px;
            border: 1px solid #888;
            border-radius: 10px;
            overflow-y: scroll;
            &::-webkit-scrollbar{   
                width: 5px;
                height: 5px;
                &:hover{
                    background-color:rgb(250, 241, 241) ;
                }
            }
            &::-webkit-scrollbar-thumb{
                height: 5px;
                &:hover{
                background-color: rgb(212, 209, 209);
                height: 2px;
                border-radius: 50px;
                }
            }
            .search{
                display: flex;
                justify-content: space-between;
                width: 100%;
                .search-category{
                    @extend .form-control ,.fw-bold;
                    width:100%;
                    font-size: 1.5rem;
                    border: 2px solid $blue_color;
                    &:hover,&:focus{
                        box-shadow: $shadow_1   ;
                    }
                } 
            }
            form{
                width: 100%;
            }
            .category-add{
                @extend .btn;
                background-color: #4690ff49;
                color: #4691FF;
                width: 10%;
                margin-top: 2%;
                padding-left: 2%;
                padding-right: 2%;
                box-shadow: $shadow_1;  
                
                &:focus,&:hover{
                    box-shadow: $shadow_1;
                    color: #3884f7;
                    background-color: #3884f77e;
                }
            }  
            .err-content{
                margin-top: 2%;
                .error{
                    @extend .alert, .alert-warning, .fw-bold;
                }
            }
            .category-list{
                position: relative;
                display: flex;
                width: 100%;
                justify-content: center;
                flex-direction: column;
                .category{
                    @extend .fw-bold;
                    display: flex;
                    width: 100%;
                    justify-content: space-between ;
                    margin-top: 2%;
                    padding: 2%;
                    background-color: white;
                    border-radius: 5px;
                    color: rgb(92, 91, 91);
                    align-items: center;
                    &:hover,&:focus{
                        background-color: #5192f3be;
                        color: white;
                        box-shadow: $shadow_1;
                    }
                    .delete{        
                        @extend .btn;
                        color: grey;
                        &:hover,&:focus{
                            color: white;
                            background-color: #3884f7e8;

                        }
                    }
                }
            }
            @include breakpoint-down(medium){
                width: 70%;
            }
            @include breakpoint-down(small){
                width: 90%;
                .search{
                    .search-category{
                        font-size: 1.2rem;
                    }
                }
            }
        }
      
    }


</style>