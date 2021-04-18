<template>
    <div>
        <div class="container">
            <div class="row1">
                <!--left part-->
                <div class="column1">
                    <h3 class="header">My Profile</h3>
                    <hr class="hr-left">

                    <!--bottom part-->
                    <div class="left1">
                        <label for="email">Email</label><br>
                        <input type="text" placeholder="" name="email" id="email" required><br>
                
                        <label for="">Username</label><br>
                        <input type="text" placeholder="" name="username" id="" required><br>
                
                        <label for="">Mobile Number</label><br>
                        <input type="text" placeholder="" name="mobile number" id="" required>
                    </div>
                </div>
                <!--right part-->
                <div class="column2">
                    <h3 class="header">Password</h3>
                    <hr class="hr-right">

                    <div class="right1">
                        <label for="">Current Password</label>
                        <input type="password" placeholder="" name="current-password" id="" required><br>

                        <label for="">New Password</label>
                        <input type="password" placeholder="" name="new-password" id="" required>

                        <label for="">Confirm Password</label>
                        <input type="password" name="confirm-password" id="" required>
                    </div>

                    <input type="submit" name="" id="" value="Save" class="btn1">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'edit_user',
}
</script>

<style scoped>
 * {
        box-sizing: border-box;
    }

    .row1 {
        display: flex;
    }

    /* Create two equal columns that sits next to each other */
    .column1 {
        flex: 60%;
        padding: 10px;
        height: 300px; /* Should be removed. Only for demonstration */
    }
    .column2 {
        flex: 40%;
        padding: 10px;
        height: 300px; /* Should be removed. Only for demonstration */
    }    
    .header{
        color: #D60265;
        font-weight: bold;
        text-align: center;
        padding: 15px;
    }

    /* Full-width input fields */
    input[type=text], input[type=password] {
        width: 90%;
        padding: 15px;
        margin: 5px 0 30px 0;
        display: inline-block;
        border: none;
        background: #f1f1f1;
    }

    input[type=text]:focus, input[type=password]:focus {
        background-color: #ddd;
        outline: none;
    }

    /* Overwrite default styles of hr */
    .hr-left {
        color: gainsboro;
        margin-left: 10%;
        width: 80%;
    }

    /* Add a blue text color to links */
    a {
        color: dodgerblue;
    }
    .left1{
        margin-left: 10%;
    }
    .hr-right{
        color: gainsboro; 
        width: 90%;
        margin-left: 0;
    }
    .btn1{
        color: white;
        background-color: #D60265;
        font-size: 20px;
        padding: 8px;
    }

</style>