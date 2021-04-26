<template>
    <div class="profile-container">
        <h2 class="fw-bold">Customer Profile</h2>
        <div class="line"></div>
       
        <div class="row1">
            <div class="column1">
               <p class="info">Username:</p>
               <p class="info">Email:</p>
               <p class="info">Phone Number:</p>
               
            </div>
            
            <div class="column2">
               <p class="info1">Amazing</p>
               <p class="info1">Amazing@gmail.com</p>
               <p class="info1">+855112211</p>
              
            </div>
        </div>
        <router-link to="/edituser" class="btn1">Edit Profile</router-link>
    </div>
</template>
<script>
export default {
    title:'Profile',
    name:'view_profile',
}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    * {
        box-sizing: border-box;
    }
    .profile-container{
        @extend .container;
        margin-top:2% ;
        padding: 2%;
        width: 50%;
        display: flex;
        flex-direction: column;
        background-color: white;
        justify-content: center;
        box-shadow: $shadow_1;
        border-radius: 5px;
        @include breakpoint-down(large){
            width: 50%;
        }
        @include breakpoint-down(medium){
            width: 70%;
        }
        @include breakpoint-down(small){
            width: 96%;
        }
        .row1 {
            display: flex;
            justify-content: space-between;
            margin-top: 2%;
            width: 100%;
        }

        /* Create two equal columns that sits next to each other */
        .column1 {
            width: 50%;
            // padding: 10px;
            padding-left:3% ;
        }
        .column2 {
            width: 50%;
            padding-left:4% ;
        }
        .info{
            font-weight: bold;
        }
        h2{
            color:#D60265;
            text-align: center;
        }
        .line{
            color: #ddd;
            border: 1px solid #ddd;
        }
        .btn1{
            @extend .btn;
            background-color: #D60265;
            color: white;
            border: none;
            width: 20%;    
            &:hover,&:focus{
                box-shadow: $shadow_2;
                color: white;
                background-color: #e21a77;
            }
            @include breakpoint-up(large){
                width: 25%;
            }
            
            @include breakpoint-down(small){
                width: 30%;
            }
        }
    }
</style>