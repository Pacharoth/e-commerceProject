<template>
    <div class="container">
        <h3>Post Order</h3>
        <div class="line"></div>
        
        <div class="row">
            <div class="column1">
                <h4>Clothy Store</h4>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h4>10$</h4>
                <button class="btn">Reorder</button>
            </div>
        </div>
        <div class="line"></div>

        <div class="row">
            <div class="column1">
                <h4>Clothy Store</h4>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h4>10$</h4>
                <button class="btn">Reorder</button>
            </div>
        </div>
        <div class="line"></div>

        <div class="row">
            <div class="column1">
                <h4>Clothy Store</h4>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h4>10$</h4>
                <button class="btn">Reorder</button>
            </div>
        </div>
        <div class="line"></div>

        <div class="row">
            <div class="column1">
                <h4>Clothy Store</h4>
                <p>Mar 2, 2021</p>
                <p>Men Pants /L / Black x1</p>
            </div>

            <div class="column2">
                <h4>10$</h4>
                <button class="btn">Reorder</button>
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

    .row {
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
    h3{
        color: #D60265;
        margin-left: 10%;
    }
    .line{
        border: 1px solid #ddd;
        width: 80%;
        margin-left: 10%;
    }
    .btn{
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