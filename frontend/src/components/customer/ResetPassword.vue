<template>
    <div class="resetpwd-container">
        <form action="">
            <h5 class="fw-bold">Reset Password</h5>
            <hr>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" required class="form-control" id="exampleInputPassword1">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Confirm password</label>
                <input type="password" required class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" >Save Change</button>
        </form>
    </div>
</template>
<script>
export default {
    name:"ResetPassword",
    title:"Reset Password",

}
</script>
<style lang="scss" scoped>
    @import '../../assets/sass/colorpage';
    @import '../../assets/sass/maxin';
    @import'../../../node_modules/bootstrap/scss/bootstrap.scss';
    .resetpwd-container{
        width: 40%;
        margin: auto;
        margin-top: 2%;
        padding: 2%;
        background-color: white;
        box-shadow: $shadow_1;
        border-radius: 10px;
        input{
            background-color: #eee;
            border: none;
            border-radius: 50px;
            color: grey;
            &:hover,&:focus{
                border:none;
                background-color: rgba(238, 238, 238, 0.747);
                box-shadow: $shadow_2;
            }
        }
        button{
            @extend .btn;
            border: none;
            background-color: #c01464d8;
            color: white;
            border-radius: 5px;
            margin: auto;
            &:hover,&:focus{
                box-shadow: $shadow_1;
                background-color: #e61c7ab2;
                color: white;
                border: none;
            }
        }
    }
</style>