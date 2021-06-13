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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { searchProduct } from '../../utils/search'
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
export default {
    name:'Categorydropdown',
    setup() {
        const store =useStore()
        const route = useRouter();
        const search = ref("");
        async function getCategory(data){
            search.value=data;
        }
        watch(search,async()=>{
            await searchProduct({store,value:search.value,route})
        })
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