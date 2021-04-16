<template>
    <div class="dashboard-container">
        <div class="dashtitle-gen">
            <h4>Dashboard</h4>
            <button class="btn btn-primary">Generate Report</button>
        </div>
        <div class="dashboard-card">

        </div>
        <div class="dashboard-graph">
            <div class="dashboard-gmy">
                <span>Earning Statistics</span>
                <div class="month-year">
                    <button>Monthly</button>
                    <button>Weekly</button>
                </div>
            </div>
            <canvas></canvas>
        </div>
    </div>
</template>
<script>
export default {
    title:"Admin Dashboard",
    name:"Dashboard"
}
</script>