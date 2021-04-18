<template>
    <div class="container">
        <h4 class="header">Post Order</h4>
        <div class="line"></div>
        
        <div class="row1">
            <div class="column1">
                <h6 class="title">Clothy Store</h6>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h6>10$</h6>
                <button class="btn2">Reorder</button>
            </div>
        </div>
        <div class="line"></div>

        <div class="row1">
            <div class="column1">
                <h6>Clothy Store</h6>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h6>10$</h6>
                <button class="btn2">Reorder</button>
            </div>
        </div>
        <div class="line"></div>

        <div class="row1">
            <div class="column1">
                <h6>Clothy Store</h6>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h6>10$</h6>
                <button class="btn2">Reorder</button>
            </div>
        </div>
        <div class="line"></div>

        <div class="row1">
            <div class="column1">
                <h6>Clothy Store</h6>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h6>10$</h6>
                <button class="btn2">Reorder</button>
            </div>
        </div>
        <div class="line"></div>
        <button class="btn1">see more</button>
    </div>
</template>

<script>
export default {
    name: 'postOrder',
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .row1 {
        display: flex;
    }
    .column1 {
        flex: 70%;
        padding: 10px;
        margin-left: 10%;
    }
    .column2 {
        flex: 70%;
        padding: 10px;
        text-align: center;
    }
    .header{
        color: #D60265;
        margin-left: 10%;
        margin-bottom: 3%;
        margin-top: 3%;
    }
    .line{
        border: 1px solid #ddd;
        width: 80%;
        margin-left: 10%;
    }
    .btn2{
        background-color: white;
        color: #D60265;
        border: 2px solid #D60265;
    }
    .btn1{
        border: none;
        background-color: white;
        color: #aaa;
        margin-left: 50%;
        font-size: 15px;
    }
</style>