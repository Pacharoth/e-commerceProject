<template>
    <div>
        <div class="container">
        <h3 class="header">Shopping Card</h3>

            <!--first part-->
            <div class="row1-one">
                <p style="color: #D60265;">
                    <i style="font-size:24px" class="fa">&#xf058;</i>
                    Clothy Shop
                </p>
                <div class="row1">
                    <!--left part-->
                    <div class="column1">
                        <span>
                            <i class="fa fa-check-circle" style="font-size:24px;color:#D60265"><img src="" alt=""></i>
                        </span>
                    </div>

                    <!--right part-->
                    <div class="column2">
                        Blending uptown chic with downtown cool, the Slater sling pack combines our signature logo print with contrasting leather trim. A removable braided chain strap lends an edgy effect, while a front zip pocket 

                        <p>Size: L <span>Color: Gray</span></p>
                        <p style="font-weight: bold;">$10</p>
                        <!--quantity part-->
                        <div class="flex-container">
                            <div>x1</div>
                        </div>
                    </div>
                </div>
            </div>

            <!--second part-->
            <div class="row1-two">
                <div class="small-row1">
                    <p style="color: #D60265;">
                        <i style="font-size:24px" class="fa">&#xf058;</i>
                        Clothy Shop
                    </p>
                    <div class="row1">
                        <!--left part-->
                        <div class="column1">
                            <span>
                                <i class="fa fa-check-circle" style="font-size:24px;color:#D60265"><img src="" alt=""></i>
                            </span>
                        </div>
    
                        <!--right part-->
                        <div class="column2">
                            Blending uptown chic with downtown cool, the Slater sling pack combines our signature logo print with contrasting leather trim. A removable braided chain strap lends an edgy effect, while a front zip pocket 
    
                            <p>Size: L <span>Color: Gray</span></p>
                            <p style="font-weight: bold;">$10</p>
                            <!--quantity part-->
                            <div class="flex-container">
                                <div>x1</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="small-row2">
                    <div class="row1">
                         <!--left part-->
                        <div class="column1">
                            <span>
                                <i class="fa fa-check-circle" style="font-size:24px;color:#D60265"><img src="" alt=""></i>
                            </span>
                        </div>
    
                        <!--right part-->
                        <div class="column2">
                            Blending uptown chic with downtown cool, the Slater sling pack combines our signature logo print with contrasting leather trim. A removable braided chain strap lends an edgy effect, while a front zip pocket 
    
                            <p>Size: L <span>Color: Gray</span></p>
                            <p style="font-weight: bold;">$10</p>
                            <!--quantity part-->
                           <div class="flex-container">
                                <div>x1</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--third part-->
            <div class="row1-third">
                <p style="color: #D60265;">
                    <i style="font-size:24px" class="fa">&#xf058;</i>
                    Clothy Shop
                </p>
                <div class="row1">
                    <!--left part-->
                    <div class="column1">
                        <span>
                            <i class="fa fa-check-circle" style="font-size:24px;color:#D60265"><img src="" alt=""></i>
                        </span>
                    </div>

                    <!--right part-->
                    <div class="column2">
                        Blending uptown chic with downtown cool, the Slater sling pack combines our signature logo print with contrasting leather trim. A removable braided chain strap lends an edgy effect, while a front zip pocket 

                        <p>Size: L <span>Color: Gray</span></p> 
                        <p style="font-weight: bold;">$10</p>
                        <!--quantity part-->
                        <div class="flex-container">
                            <div>x1</div>
                        </div>
                    </div>
                </div>
            </div>

            <!--last part-->
            <div class="last">
                <p>Total: $10 
                    <span><button type="submit" class="btn1">Check Out</button></span>
                </p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'shopping_cart',
}
</script>

<style scoped>

    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'; 
    *{
        box-sizing: border-box;
    }
    .row1{
        display: flex;
    }
    .column1{
        flex: 30%;
        padding: 10px;
    }
    .column2{
        flex: 70%;
        padding: 10px;
        margin: 0;
    }
    .header{
        color: #D60265;
        margin-left: 15%;
        margin-bottom: 3%;
    }
    .row1-one{
        width: 80%;
        margin-left: 15%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        padding: 15px;
    }
    .row1-two{
        margin-top: 5%;
        width: 80%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        padding: 15px;
        margin-left: 15%;
    }
    .row1-third{
        margin-top: 5%;
        width: 80%;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        padding: 15px;
        margin-left: 15%;
    }
    .last{
        float: right;
        margin: 3%;
        padding: 10px;
    }
    .btn1{
        background-color: #D60265;
        color: white;
        padding: 15px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    .flex-container {
        display: flex;
        float: right;
    }

    .flex-container > div {
        background-color: white;
        color: black;
        width: 40px;
        padding: 5px;
        text-align: center;
        border: 1px solid black;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
</style>