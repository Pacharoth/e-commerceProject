<template>

    <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <em class="fas fa-bars"></em>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <h6 class="title ms-2">Category</h6>
          <li v-for="cat in categories" :key="cat"><a class="dropdown-item" href="#">{{cat.name}}</a></li>
        </ul>
    </div>
    
</template>
<script>
import axios from 'axios'
export default {
    name:'Categorydropdown',
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