<template>
    <form action="" class="containers" @click="generatePDF">
    </form>
</template>
<script>
export default {
    props:['id'],
    name:"report",
    title:"Report",
}
</script>
<style scoped>
    .title{
        color: white;
        padding-top: 3%;
        padding-bottom: 3%;
    }
    
    .title-background{
        background-color: #D60265;
    }
    .containers{
        margin: auto;
        width: 50%;
        margin-top: 2%;
    }
    hr{
        color: #D60265;
      
    }
    .description{
        color: #D60265;
    }
    .detail{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100px;
    }
    .total{
        align-items: center;
        padding-bottom: 5%;
    }
    @media (max-width:862px){
        .containers{
            width: 70%;
        }
    }
    @media (max-width:500px) {
        .containers{
            width: 80%;
        }
    }
    @media (max-width:400px) {
        .containers{
            width: 90%;
        }
    }
</style>