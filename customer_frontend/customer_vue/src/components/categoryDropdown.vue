<template>

    <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" @click="slideDown">
            <i class="fas fa-bars"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" ref="dropdown">
            <h6 class="title ms-2">Category</h6>
          <li><a class="dropdown-item" href="#">Electronic</a></li>
          <li><a class="dropdown-item" href="#">Clothes</a></li>
          <li><a class="dropdown-item" href="#">Bag</a></li>
          <li><a class="dropdown-item" href="#">Computer</a></li>
        </ul>
    </div>
    
</template>
<script>
export default {
    methods: {
        slideDown(){
            const slidedown = this.$refs.dropdown.classList
            slidedown.contains("show")?slidedown.remove('show'):slidedown.add('show');
        }
    },
}
</script>
<style scoped>
    .title{
        color: #D60265;
    }

</style>