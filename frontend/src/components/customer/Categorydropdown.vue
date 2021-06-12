<template>

    <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <em class="fas fa-bars"></em>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <h6 class="title ms-2">Category</h6>
          <li v-for="cat in categories" :key="cat"><button @click="getCategory(cat.name)" class="dropdown-item" >{{cat.name}}</button></li>
        </ul>
    </div>
    
</template>
<script>
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { localhost } from '../../utils/FormValidation'
export default {
    name:'Categorydropdown',
    setup() {
        const store =useStore()
        const route = useRoute();   
        const router = useRouter();
        async function getCategory(data){
            router.push({name:'customerlistproduct',query:{q:data}});
            const response=await axios.get(localhost+"/search/product?q="+route.query.q);
            console.log(route.query.q);
            store.dispatch('customer/searchProduct',response.data);
        }
        return{
            getCategory,
        }
    },
    data(){
        return{
            categories:[],
        }
    },
    async mounted(){
        const res = await axios.get('http://localhost:3000/category')
        console.log('result of category',res.data)
        this.categories=res.data
    }
}
</script>
<style scoped>
    .title{
        color: #D60265;
    }

</style>