<template>
    <div>
       <div class="container">
        <h4 class="header">Feedback</h4>

        <div class="line"></div>
        <!--bottom part-->
        <div class="row1">
            <div class="column1">
                <h6>Ginzy</h6>
            </div>

            <div class="column2">
                <p>1 month ago <br>this pants is pretty cool more than i expected</p>

            </div>

            <div class="column3">
                
            </div>
        </div>

        <div class="row1">
            <div class="column1">
                <h6>Ginzy</h6>
            </div>

            <div class="column2">
                <p>1 month ago <br>this pants is pretty cool more than i expected</p>
            </div>

            <div class="column3">
                <!-- <button class="btn2">Reply</button> -->
            </div>
        </div>

        <div class="row1">
            <div class="column1">
                <h6>Ginzy</h6>
            </div>

            <div class="column2">
                <p>1 month ago <br>this pants is pretty cool more than i expected</p>
            </div>

            <div class="column3">
               <!-- <button class="btn2">Reply</button> -->
            </div>
        </div>

        <div class="row1">
            <div class="column1">
                <h6>Ginzy</h6>
            </div>

            <div class="column2">
                <p>1 month ago <br>this pants is pretty cool more than i expected</p>
            </div>

            <div class="column3">
                <!-- <button class="btn2">Reply</button> -->
            </div>
        </div>
        <button class="btn1">see more</button>
    </div>
    </div>
</template>

<script>
export default {
    name: 'feedback',
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .column1 {
        float: left;
        width: 20%;
        padding: 10px; 
    }

    .column2 {
        float: left;
        width: 60%;
        padding: 10px;
    }

    .column3 {
        float: left;
        width: 20%;
        padding: 10px;
    }

    /* Clear floats after the columns */
    .row1:after {
        content: "";
        display: flex;
        clear: both;
    }

    /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
        .column {
            width: 100%;
        }
    }

    .header{
        color: #D60265;
        margin-left: 8%;
        margin-bottom: 3%;
        margin-top: 3%;
    }

    h6{
        text-align: center;
    }
    .row1:after {
        content: "";
        display: flex;
        clear: both;
    }
    .column33 {
        float: left;
        width: 10%;
        padding: 10px;
        margin-left: 5%;
    }
    .line{
        border: 1px solid #D60265;
        width: 80%;
        margin-left: 8%;
        margin-bottom: 2%;
    }
    .btn1{
        border: none;
        background-color: white;
        color: #aaa;
        margin-left: 50%;
        font-size: 15px;
    }
    .column22 {
        float: left;
        width: 60%;
        padding: 10px;
    }
    .btn2{
        border: none;
        background-color: white;
        color: #aaa;
        font-weight: bold;
    }

</style>